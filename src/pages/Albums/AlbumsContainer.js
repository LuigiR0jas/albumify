import React, { Component } from "react";
import queryString from "query-string";

import Albums from "./Albums";

export default class AlbumsContainer extends Component {
	constructor(props) {
		super(props);

		const values = queryString.parse(this.props.location.search);

		this.state = {
			access_token: values.access_token,
			refresh_token: values.refresh_token,
			fetching_progress: "",
			user_loading: true,
			albums_loading: true,
			error: null,
			user: null,
			trackList: [],
			albumList: [],
			albumCoverArtList: [],
			sortedAlbumList: [],
			slicedAlbumList: [],
		};
	}

	componentDidMount() {
		if (this.state.access_token) {
			this.fetchTracks();
			this.fetchUser();
		} else {
			this.props.history.push("/");
		}
	}

	// Fetch error handler
	handleErrors = (response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	};

	fetchUser = () => {
		fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: "Bearer " + this.state.access_token,
			},
		})
			.then(this.handleErrors)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					user_loading: false,
					user: {
						displayName: data.display_name,
						avatar: data.images[0].url,
						email: data.email,
						href: data.href,
						id: data.id,
						product: data.product,
					},
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Fetch user liked tracks from Spotify API
	fetchTracks = (
		trackList = [],
		url = "https://api.spotify.com/v1/me/tracks?limit=50"
	) => {
		fetch(url, {
			headers: {
				Authorization: "Bearer " + this.state.access_token,
			},
		})
			.then(this.handleErrors)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
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
						preview_url: track.preview_url,
					});
				}
				this.calculateFetchingProgress(trackList.length, data.total);

				if (data.next) {
					// If there are songs left, call the function again with the next url
					this.fetchTracks(trackList, data.next);
				} else {
					this.populateAlbumList(trackList);
					this.setState({
						trackList: trackList,
					});
				}
			})
			.catch((error) => {
				// error handling
				console.log(error);
			});
	};

	calculateFetchingProgress = (current, total) => {
		let progress = Math.round((current / total) * 100);
		this.setState({
			fetching_progress: progress,
		});
	};

	getRatio = (likes, totalTracks) => {
		return Math.round((likes / totalTracks) * 10000) / 10000;
	};

	getScore = (ratio) => {
		let score = "⭐☆☆☆☆";
		if (ratio >= 0.25) {
			score = "⭐⭐☆☆☆";
			if (ratio >= 0.5) {
				score = "⭐⭐⭐☆☆";
				if (ratio >= 0.75) {
					score = "⭐⭐⭐⭐☆";
					if (ratio === 1) {
						score = "⭐⭐⭐⭐⭐";
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
			score: score,
		};
	};

	addAlbum = (albumList, track) => {
		let releaseDate = new Date(track.album.release_date);
		let year = new Date();
		year = releaseDate.getFullYear();

		albumList.push({
			id: track.album.id,
			name: track.album.name,
			releaseDate: track.album.release_date,
			year: year,
			artists: track.album.artists,
			cover: track.album.images[1],
			likedTracks: [track],
			likes: 1,
			totalTracks: track.album.total_tracks,
			metrics: this.calculateMetrics(1, track.album.total_tracks),
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

	populateAlbumList = (trackList) => {
		// An album is being defined as a collection with or more than 4 tracks
		let albumLength = 4;
		let albumList = [];

		for (let track of trackList) {
			if (track.album.total_tracks >= albumLength) {
				// Automatically add the first album
				// With the first album added, start traversing the album list array to update or add new entries
				// If there's a hit, let's update the entry
				if (albumList.length == 0) {
					albumList = this.addAlbum(albumList, track);
				} else {
					for (let i = 0; i < albumList.length; i++) {
						if (albumList[i].name == track.album.name) {
							albumList[i] = this.updateAlbum(
								albumList[i],
								track
							);
							break;
						}
						// If by the end of the array there's no hits, the album has not been added before
						// So let's add it
						if (i == albumList.length - 1) {
							albumList = this.addAlbum(albumList, track);
							break;
						}
					}
				}
			}
		}
		this.setState({
			albumList: albumList,
		});
		this.albumListSort(albumList);
	};

	albumListSort = (albumList) => {
		let sortedAlbumList = albumList.sort((a, b) => {
			return b.metrics.ratio - a.metrics.ratio;
		});

		this.setState({
			sortedAlbumList: sortedAlbumList,
		});
		this.albumCoverArtListPopulate(sortedAlbumList);
		this.sliceArrayInChunks(sortedAlbumList, 20);
	};

	albumCoverArtListPopulate = (sortedAlbumList) => {
		let albumCoverArtList = [];
		sortedAlbumList.forEach((album, index) => {
			if (album.cover !== undefined && index < 9) {
				let coverArt = new Image();
				coverArt.src = album.cover.url;
				coverArt.crossOrigin = "Anonymous";
				albumCoverArtList.push(coverArt);
			}
		});
		this.setState({ albumCoverArtList: albumCoverArtList });
	};

	sliceArrayInChunks = (sortedAlbumList, subArraySize) => {
		// sortedAlbumList is the array we will slice in chunks
		// subArraySize is the length each subarray will have

		let slicedAlbumList = [],
			auxiliaryArray = [];

		sortedAlbumList.forEach((album, index, sortedAlbumList) => {
			let realIndex = index + 1;
			album["rank"] = realIndex;

			if (
				Number.isInteger(realIndex / subArraySize) ||
				realIndex == sortedAlbumList.length
			) {
				auxiliaryArray.push(album);
				slicedAlbumList.push(auxiliaryArray);
				auxiliaryArray = [];
			} else {
				auxiliaryArray.push(album);
			}
		});

		this.setState({
			albums_loading: false,
			slicedAlbumList: slicedAlbumList,
		});
	};

	render() {
		return (
			<Albums
				userLoading={this.state.user_loading}
				albumsLoading={this.state.albums_loading}
				progress={this.state.fetching_progress}
				user={this.state.user}
				albums={this.state.slicedAlbumList}
				albumsCoverArt={this.state.albumCoverArtList}
				access_token={this.state.access_token}></Albums>
		);
	}
}
