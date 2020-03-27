import React from "react";

import User from "../components/User";
import AlbumsList from "../components/AlbumsList";

import ProfilePic from "../images/profilepic.jpg";
import "./styles/Albums.css";

export default function Albums(props) {
	return (
		<React.Fragment>
			<User user={props.user}></User>
			<br />
			<AlbumsList albums={props.albums}></AlbumsList>
		</React.Fragment>
	);
}
