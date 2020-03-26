import React from "react";
import { Link } from "react-router-dom";

import "./styles/Home.css";
import SpotifyLogoWhite from "../images/Spotify Logo White.png";

export default function Home() {
	return (
		<div className="home-container container-fluid align-items-center">
			<div className="row justify-content-center">
				<h1>Discover and share your favorite albums!</h1>
			</div>
			<div className="row justify-content-center">
				<p>
					Get a list of your favorite albums acording to our
					algorithm, and generate a collage or a playlist to share
					with your friends!
				</p>
			</div>
			<br />
			<div className="row justify-content-center">
				<Link to="/albums" className="btn btn-primary">
					Connect with{"  "}
					<img
						className="btn__logo"
						src={SpotifyLogoWhite}
						alt=""
					/>{" "}
					Spotify
				</Link>
			</div>
		</div>
	);
}
