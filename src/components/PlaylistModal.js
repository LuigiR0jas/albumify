import React from "react";

import Modal from "./Modal";

export default function PlaylistModal(props) {
	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			closeButtonID={props.closeButtonID}>
			<div className="container">
				<div className="row justify-content-center">
					<h5 className="mb-0">Auto-generate a playlist</h5>
				</div>
				<br />
				<div className="row justify-content-center"></div>
			</div>
		</Modal>
	);
}
