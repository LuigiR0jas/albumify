import React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
	return (
		<div>
			<NavBar></NavBar>
			{props.children}
			<Footer></Footer>
		</div>
	);
}
