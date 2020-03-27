import React, { Component } from "react";
import queryString from "query-string";

import Albums from "./Albums";
import AlbumsList from "../components/AlbumsList";
import Loading from "../components/Loading";

export default class AlbumsContainer extends Component {
	constructor(props) {
		super(props);

		const values = queryString.parse(this.props.location.search);

		this.state = {
			loading: true,
			error: null,
			access_token: values.access_token,
			refresh_token: values.refresh_token,
			user: null,
			trackList: [],
			albumList: [],
			sortedAlbumList: []
		};
	}

	componentDidMount() {
		// lets analyze a tracklist saved on the localstorage testing purposes
		if (localStorage.getItem("tracklist") !== null) {
			this.populateAlbumList();
			this.fetchUser();
		} else {
			// this is the function which should be called every time the component mounts
			this.fetchTracks();
			this.fetchUser();
		}
	}

	// Fetch error handler
	handleErrors = response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	};

	fetchUser = () => {
		fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: "Bearer " + this.state.access_token
			}
		})
			.then(this.handleErrors)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState({
					loading: false,
					user: {
						displayName: data.display_name,
						avatar: data.images[0].url,
						email: data.email,
						href: data.href,
						id: data.id,
						product: data.product
					}
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	// Fetch user liked tracks from Spotify API
	fetchTracks = (trackList = [], next = undefined) => {
		let url;

		next == undefined
			? (url = "https://api.spotify.com/v1/me/tracks?limit=50")
			: (url = next);

		fetch(url, {
			headers: {
				Authorization: "Bearer " + this.state.access_token
			}
		})
			.then(this.handleErrors)
			.then(response => {
				return response.json();
			})
			.then(data => {
				// populate tracklist
				for (let object of data.items) {
					let track = object.track;
					trackList.push({
						id: track.id,
						name: track.name,
						album: track.album,
						artists: track.artists,
						uri: track.uri,
						url: track.external_urls.spotify,
						href: track.href,
						preview_url: track.preview_url
					});
				}

				if (data.next !== null) {
					console.log(
						"There are songs left to retrieve. Requesting..."
					);
					this.fetchTracks(trackList, data.next);
				} else {
					console.log("Complete tracklist created");
					this.setState({
						trackList: trackList
					});
					// lets save the list on local storage for testing purposes
					localStorage.setItem(
						"tracklist",
						JSON.stringify(trackList)
					);
					this.populateAlbumList();
				}
			})
			.catch(error => {
				// error handling
				console.log(error);
			});
	};

	getRatio = (likes, totalTracks) => {
		return Math.round((likes / totalTracks) * 10000) / 10000;
	};

	getScore = ratio => {
		let score = "☆☆☆☆☆";
		if (ratio >= 0.2) {
			score = "⭐☆☆☆☆";
			if (ratio >= 0.4) {
				score = "⭐⭐☆☆☆";
				if (ratio >= 0.6) {
					score = "⭐⭐⭐☆☆";
					if (ratio >= 0.8) {
						score = "⭐⭐⭐⭐☆";
						if (ratio == 1) {
							score = "⭐⭐⭐⭐⭐";
						}
					}
				}
			}
		}
		return score;
	};

	calculateMetrics = (likes, totalTracks) => {
		let ratio = this.getRatio(likes, totalTracks);
		let score = this.getScore(ratio);

		return {
			ratio: ratio,
			score: score
		};
	};

	addAlbum = (albumList, track) => {
		let releaseDate = new Date(track.album.release_date);
		let year = new Date();
		year = releaseDate.getFullYear();

		albumList.push({
			name: track.album.name,
			releaseDate: track.album.release_date,
			year: year,
			artists: track.album.artists,
			cover: track.album.images[1],
			albumObject: track.album,
			likedTracks: [track],
			likes: 1,
			totalTracks: track.album.total_tracks,
			metrics: this.calculateMetrics(1, track.album.total_tracks)
		});

		return albumList;
	};

	updateAlbum = (albumListItem, track) => {
		albumListItem.likedTracks.push(track);
		albumListItem.likes++;
		albumListItem.metrics = this.calculateMetrics(
			albumListItem.likes,
			albumListItem.totalTracks
		);

		return albumListItem;
	};

	populateAlbumList = (trackList = []) => {
		// Get trackList from localstorage for testing purposes
		trackList = JSON.parse(localStorage.getItem("tracklist"));
		console.log(trackList);

		let albumList = [];

		for (let track of trackList) {
			// An album is being defined as a collection of more than 6 tracks
			if (track.album.total_tracks >= 6) {
				// Automatically add the first album
				if (albumList.length == 0) {
					albumList = this.addAlbum(albumList, track);
				} else {
					// With the first album added, start traversing the album list array to update or add new entries
					for (let i = 0; i < albumList.length; i++) {
						// If there's a hit, let's update the entry
						if (albumList[i].albumObject.name == track.album.name) {
							// Add the liked track to the list, bump the "likes" count and adjust ratio
							albumList[i] = this.updateAlbum(
								albumList[i],
								track
							);
							break;
						}
						// If by the end of the array there's no hits, the album has not been added before
						if (i == albumList.length - 1) {
							// So let's add it
							albumList = this.addAlbum(albumList, track);
							break;
						}
					}
				}
			}
		}
		console.log("Albumlist population finished: ");
		console.log(albumList);
		this.setState({
			albumList: albumList
		});
		this.albumListSort(albumList);
	};

	albumListSort = albumList => {
		let sortedAlbumList = albumList.sort(function(a, b) {
			if (a.metrics.ratio < b.metrics.ratio) {
				return 1;
			}
			if (a.ratio > b.ratio) {
				return -1;
			}
			return 0;
		});
		console.log("Sorting finished: ");
		console.log(sortedAlbumList);

		this.setState({
			sortedAlbumList: sortedAlbumList
		});
	};

	render() {
		if (this.state.loading) {
			return <Loading></Loading>;
		} else {
			return (
				<Albums
					user={this.state.user}
					albums={this.state.sortedAlbumList}></Albums>
			);
		}
	}
}
