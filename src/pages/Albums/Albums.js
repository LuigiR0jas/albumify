import React from "react";

import User from "../../components/User/User";
import UserLoader from "../../components/User/UserLoader";
import AlbumsList from "../../components/Albums/AlbumsList";
import AlbumsListLoader from "../../components/Albums/AlbumsListLoader";
import Toast from "../../components/Toast/Toast";

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
				<AlbumsList
					albums={props.albums}
					albumsCoverArt={props.albumsCoverArt}
					user={props.user}
					access_token={props.access_token}></AlbumsList>
			)}
		</React.Fragment>
	);
}
