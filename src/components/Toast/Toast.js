import React from "react";

import "./styles/Toast.css";

import Progress from "../Progress/Progress";

export default function Toast(props) {
	return (
		<div
			className="toast toast-informative"
			role="alert"
			aria-live="assertive"
			aria-atomic="true">
			<div className="toast-header dark-background">
				<div className="spinner-border spinner-border-sm" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<strong className="mr-auto ml-2 light-text">
					{props.toastHeader}
				</strong>
			</div>
			<div className="toast-body dark-background light-text">
				<Progress progress={props.progress}></Progress>
			</div>
		</div>
	);
}
