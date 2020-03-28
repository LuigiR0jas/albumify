import React, { Component } from "react";

import AlbumsListElement from "./AlbumsListElement";

export default class AlbumsList extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<h3>These are your favorite albums!</h3>
					</div>
				</div>
				{this.props.albums.slice(0, 15).map((album, index) => {
					return (
						<AlbumsListElement
							key={album.id}
							album={album}
							rank={index + 1}></AlbumsListElement>
					);
				})}
			</React.Fragment>
		);
	}
}
