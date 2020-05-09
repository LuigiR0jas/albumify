import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import "./styles/App.css";

import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import AlbumsContainer from "../../pages/Albums/AlbumsContainer";
import NotFound from "../../pages/NotFound/NotFound";

function App(props) {
	let path = useLocation().pathname;
	return (
		<Layout pathname={path}>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/albums" component={AlbumsContainer}></Route>
				<Route component={NotFound}></Route>
			</Switch>
		</Layout>
	);
}

export default App;
