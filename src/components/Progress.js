import React from "react";

import "./styles/Progress.css";

export default function Progress(props) {
	return (
		<div className="progress no-background">
			<div
				className="progress-bar"
				style={{ width: props.progress + "%" }}
				role="progressbar"></div>
		</div>
	);
}
