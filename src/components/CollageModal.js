import React from "react";

import Modal from "./Modal";
import Canvas from "./Canvas";

export default function CollageModal(props) {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<div className="container">
				<div className="row justify-content-center">
					<h5>Generate collage</h5>
				</div>
				<div className="row justify-content-center">
					<Canvas images={props.images}></Canvas>
				</div>
			</div>
		</Modal>
	);
}
