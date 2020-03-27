import React from "react";

export default function Loading() {
	return (
		<div class="d-flex fill justify-content-center align-items-center">
			<div class="spinner-border text-primary" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	);
}
