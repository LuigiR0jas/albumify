import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("app"));

serviceWorker.unregister();
