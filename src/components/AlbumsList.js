import React, { Component } from "react";

import AlbumsListElement from "./AlbumsListElement";

export default class AlbumsList extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<h2>These are your favorite albums!</h2>
					</div>
				</div>
				<AlbumsListElement></AlbumsListElement>
			</React.Fragment>
		);
	}
}
