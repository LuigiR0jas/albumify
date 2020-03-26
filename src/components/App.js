import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import Albums from "../pages/Albums";
import NotFound from "../pages/NotFound";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/albums" component={Albums}></Route>
					<Route component={NotFound}></Route>
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
