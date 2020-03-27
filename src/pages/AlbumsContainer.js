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
			trackList: []
		};
	}

	componentDidMount() {
		this.fetchAlbums();
	}

	handleErrors = response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	};

	fetchAlbums = async (next = null) => {
		console.log(this.state.access_token);
		fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
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
				// populate tracklist
				for (let object of data.items) {
					let track = object.track;
					// tracklist.push({
					// 	name: track.name,
					// 	album: track.album,
					// 	artists: track.artists,
					// 	uri: track.uri
					// });
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return <Albums></Albums>;
	}
}
