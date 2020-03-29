// import React from "react";
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles/App.css";

import Layout from "./Layout";
import Home from "../pages/Home";
import AlbumsContainer from "../pages/AlbumsContainer";
import NotFound from "../pages/NotFound";

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<Layout contentWrapClass={}>
// 				<Switch>
// 					<Route exact path="/" component={Home}></Route>
// 					<Route
// 						exact
// 						path="/albums"
// 						component={AlbumsContainer}></Route>
// 					<Route component={NotFound}></Route>
// 				</Switch>
// 			</Layout>
// 		</BrowserRouter>
// 	);
// }

// export default App;

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			wrapperClass: "content-wrap"
		};
	}

	componentDidMount() {
		if (window.location.pathname == "/") {
			this.setState({
				wrapperClass: "home-hero"
			});
		}
	}

	render() {
		return (
			<BrowserRouter>
				<Layout wrapperClass={this.state.wrapperClass}>
					<Switch>
						<Route exact path="/" component={Home}></Route>
						<Route
							exact
							path="/albums"
							component={AlbumsContainer}></Route>
						<Route component={NotFound}></Route>
					</Switch>
				</Layout>
			</BrowserRouter>
		);
	}
}
