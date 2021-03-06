import React from "react";

import "./styles/Home.css";
import SpotifyLogoWhite from "../../images/Spotify Logo White.png";

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login_url:
				process.env.NODE_ENV === "development"
					? "http://localhost:8888/login"
					: "/login",
		};
	}

	render() {
		return (
			<div className="home-container container-fluid align-items-center">
				<br />
				<br />
				<br />
				<br />
				<div className="row justify-content-center">
					<h1 className="textShadow">
						Discover and share your favorite albums!
					</h1>
				</div>
				<div className="row justify-content-center">
					<p className="textShadow">
						Get a list of your favorite albums acording to our
						algorithm, and generate a collage or a playlist to share
						with your friends!
					</p>
				</div>
				<br />
				<div className="row justify-content-center">
					<a href={this.state.login_url} className="btn btn-primary">
						Login with{"  "}
						<img
							className="btn__logo"
							src={SpotifyLogoWhite}
							alt=""
						/>{" "}
						Spotify
					</a>
				</div>
			</div>
		);
	}
}
