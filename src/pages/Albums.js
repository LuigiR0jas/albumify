import React from "react";

import User from "../components/User";
import UserLoader from "../components/UserLoader";
import AlbumsList from "../components/AlbumsList";
import AlbumsListLoader from "../components/AlbumsListLoader";
import Toast from "../components/Toast";

import "./styles/Albums.css";

export default function Albums(props) {
	return (
		<React.Fragment>
			{props.userLoading ? (
				<UserLoader></UserLoader>
			) : (
				<User user={props.user}></User>
			)}

			<br />

			{props.albumsLoading ? (
				<React.Fragment>
					<AlbumsListLoader></AlbumsListLoader>
					<Toast
						toastHeader="Generating album list ..."
						progress={props.progress}></Toast>
				</React.Fragment>
			) : (
				<AlbumsList albums={props.albums}></AlbumsList>
			)}
		</React.Fragment>
	);
}
