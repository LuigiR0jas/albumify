import React from "react";
import { Link } from "react-router-dom";

import "./styles/NavBar.css";
import SpotifyLogo from "../images/Spotify Logo.png";

export default function NavBar() {
	return (
		<nav className="navbar navbar-dark justify-content-center">
			<img className="brandLogo" src={SpotifyLogo} alt="Spotify Logo" />
			<Link className="navbar-brand" to="/">
				Albumify
			</Link>
		</nav>
	);
}
