import React, { Component } from "react";

import PlaylistModal from "./PlaylistModal";

export default class PlaylistModalContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			access_token: this.props.access_token,
			loading: false,
			readOnly: false,
			buttonDisabled: false,
			playlistCreated: false,
			playlistURL: "",
			playlistNameValue: "My Top 10 Albums",
			playlistDescriptionValue:
				"A playlist with my favorite songs of my top 10 albums of all time! Created with Albumify.",
		};
	}

	handleCreatePlaylist = (e) => {
		this.setState({ loading: true, readOnly: true });
		this.createPlaylist(
			this.state.playlistNameValue,
			this.state.playlistDescriptionValue
		);
	};

	handleChange = (e) => {
		switch (e.target.id) {
			case "FormPlaylistName":
				let object = {
					playlistNameValue: e.target.value,
					buttonDisabled: false,
				};
				if (e.target.value.length === 0 || !e.target.value.trim()) {
					object.buttonDisabled = true;
				}
				this.setState(object);
				break;
			case "FormPlaylistDescription":
				this.setState({ playlistDescriptionValue: e.target.value });
				break;
			default:
				break;
		}
	};

	createPlaylist = (playlistName, playlistDescription) => {
		let body = {
			name: playlistName,
			description: playlistDescription,
		};

		fetch(
			`https://api.spotify.com/v1/users/${this.props.user.id}/playlists`,
			{
				method: "POST",
				headers: {
					Authorization: "Bearer " + this.state.access_token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}
		)
			.then((response) => response.json())
			.then((response) => {
				this.setState({ playlistURL: response.external_urls.spotify });
				this.populatePlaylist(response.id);
			})
			.catch((error) => {
				console.log(error);
				this.setState({ loading: false });
			});
	};

	populatePlaylist = (
		playlistID,
		offset = 0,
		tracks = this.getTracksURIs()
	) => {
		fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + this.state.access_token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tracks[offset]),
		})
			.then((response) => response.json())
			.then((response) => {
				if (tracks.length > offset + 1) {
					this.populatePlaylist(playlistID, offset + 1, tracks);
				} else {
					this.setState({
						loading: false,
						playlistCreated: true,
					});
				}
			})
			.catch((error) => console.log(error));
	};

	getTracksURIs = () => {
		let albums = this.props.albums[0];
		let tracks = [];

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < albums[i].likedTracks.length; j++) {
				tracks.push(albums[i].likedTracks[j].uri);
			}
		}

		let slicedTracks = this.sliceTracks(tracks, 100);

		return slicedTracks;
	};

	sliceTracks = (tracks, chunk) => {
		let slicedArray = [];

		if (tracks.length > chunk) {
			for (let i = 0; i < tracks.length; i += chunk) {
				slicedArray.push(tracks.slice(i, i + chunk));
			}
		} else {
			slicedArray.push(tracks);
		}

		return slicedArray;
	};

	render() {
		return (
			<PlaylistModal
				isOpen={this.props.isOpen}
				onClose={this.props.onClose}
				closeButtonID={this.props.closeButtonID}
				loading={this.state.loading}
				readOnly={this.state.readOnly}
				disabled={this.state.buttonDisabled}
				playlistNameValue={this.state.playlistNameValue}
				playlistDescriptionValue={this.state.playlistDescriptionValue}
				playlistCreated={this.state.playlistCreated}
				playlistURL={this.state.playlistURL}
				handleChange={this.handleChange}
				onCreate={this.handleCreatePlaylist}></PlaylistModal>
		);
	}
}
