import React from "react";

import AlbumsList from "../components/AlbumsList";

import ProfilePic from "../images/profilepic.jpg";
import "./styles/Albums.css";

export default function Albums() {
	return (
		<React.Fragment>
			<div className="container">
				<div className="row justify-content-start">
					<div className="col-2">
						<div className="row justify-content-end">
							<img
								className="rounded profilepic"
								src={ProfilePic}
								alt="Profile picture"
							/>
						</div>
					</div>
					<div className="col-4">
						<p className="m-0 mt-4">Logged in as</p>
						<h1>Luigi Rojas</h1>
					</div>
				</div>
			</div>
			<br />
			<AlbumsList></AlbumsList>
		</React.Fragment>
	);
}
