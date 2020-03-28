import React from "react";

export default function Loading() {
	return (
		<div className="d-flex fill justify-content-center align-items-center">
			<div className="spinner-border text-primary" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}
