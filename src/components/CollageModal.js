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
					<Canvas draw={props.draw}></Canvas>
				</div>
				<div className="row justify-content-center">
					<a
						href={props.collageImageURL}
						className="btn btn-primary"
						download="Favorite Albums 3x3 Collage">
						Download collage
					</a>
				</div>
			</div>
		</Modal>
	);
}
