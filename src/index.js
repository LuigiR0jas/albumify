// Libraries
import React from "react";
import ReactDOM from "react-dom";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.css";

// Components
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("app"));

serviceWorker.unregister();
