import React, { Component } from "react";

import PlaylistModal from "./PlaylistModal";

export default class PlaylistModalContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			access_token: this.props.access_token,
			loading: false,
			readOnly: false,
			playlistCreated: false,
		};
	}

	handleCreatePlaylist = (e) => {
		let playlistName = document.getElementById("FormPlaylistName").value;
		let playlistDescription = document.getElementById(
			"FormPlaylistDescription"
		).value;
		this.setState({ loading: true, readOnly: true });
		this.createPlaylist(playlistName, playlistDescription);
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
				this.populatePlaylist(response.id);
			})
			.catch((error) => {
				console.log(error);
				this.setState({ loading: false });
			});
	};

	populatePlaylist = (playlistID) => {
		let body = {
			uris: [],
		};

		fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + this.state.access_token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		this.setState({ loading: false, playlistCreated: true });
	};

	render() {
		return (
			<PlaylistModal
				isOpen={this.props.isOpen}
				onClose={this.props.onClose}
				closeButtonID={this.props.closeButtonID}
				loading={this.state.loading}
				readOnly={this.state.readOnly}
				playlistCreated={this.state.playlistCreated}
				onCreate={this.handleCreatePlaylist}></PlaylistModal>
		);
	}
}
