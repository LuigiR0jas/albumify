import React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

import "./styles/Layout.css";

export default function Layout(props) {
	return (
		<React.Fragment>
			<NavBar></NavBar>
			{props.pathname == "/" ? (
				<div className="home-hero">{props.children}</div>
			) : (
				<div className="content-wrap">{props.children}</div>
			)}
			<Footer></Footer>
		</React.Fragment>
	);
}
