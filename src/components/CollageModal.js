import React from "react";

import Modal from "./Modal";
import Canvas from "./Canvas";

export default function CollageModal(props) {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<div className="container">
				<div className="row justify-content-center">
					<h5 className="mb-0">Album cover art collage</h5>
				</div>
				<br />
				{props.loading ? (
					<React.Fragment>
						<div className="row justify-content-center">
							<div class="spinner-border" role="status">
								<span class="sr-only">Loading...</span>
							</div>
						</div>
						<br />
						{/* <div className="row justify-content-center">
							<p>Generating...</p>
						</div> */}

						<div className="row justify-content-center">
							<a
								href={props.collageImageURL}
								className="btn btn-secondary disabled"
								download="Favorite Albums 3x3 Collage">
								Download collage
							</a>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="row justify-content-center">
							<Canvas draw={props.draw}></Canvas>
						</div>
						<br />
						<div className="row justify-content-center">
							<a
								href={props.collageImageURL}
								className="btn btn-primary"
								download="Favorite Albums 3x3 Collage">
								Download collage
							</a>
						</div>
					</React.Fragment>
				)}
			</div>
		</Modal>
	);
}
