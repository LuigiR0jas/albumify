import React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

import "./styles/Layout.css";

export default function Layout(props) {
	return (
		<React.Fragment>
			<NavBar></NavBar>
			<div className="content-wrap">{props.children}</div>
			<Footer></Footer>
		</React.Fragment>
	);
}
