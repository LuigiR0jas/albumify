import React from "react";

import Modal from "./Modal";

import "./styles/PlaylistModal.css";

export default function PlaylistModal(props) {
	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			closeButtonID={props.closeButtonID}>
			<div className="container">
				<div className="row justify-content-center">
					<h5 className="mb-0">Create a playlist</h5>
				</div>
				<br />
				<div className="row justify-content-center">
					<form>
						<div className="form-group">
							<label className="" htmlFor="FormPlaylistName">
								Name
							</label>
							<input
								maxLength="100"
								className="form-control"
								id="FormPlaylistName"
								aria-describedby="Name"
								value={props.playlistNameValue}
								onChange={props.handleChange}
								readOnly={props.readOnly}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="FormPlaylistDescription">
								Description
							</label>
							<textarea
								maxLength="300"
								className="form-control"
								id="FormPlaylistDescription"
								rows="4"
								value={props.playlistDescriptionValue}
								onChange={props.handleChange}
								readOnly={props.readOnly}></textarea>
						</div>
					</form>
				</div>
				<br />
				{props.loading ? (
					<div className="row justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				) : props.playlistCreated ? (
					<div className="row justify-content-center">
						<a className="btn btn-primary" href={props.playlistURL}>
							Go to Playlist
						</a>
					</div>
				) : (
					<div className="row justify-content-center">
						<div className="col-4">
							<button
								id="CancelPlaylistCreationButton"
								onClick={props.onClose}
								className="btn btn-dark cancelButton">
								Cancel
							</button>
						</div>
						<div className="col-4">
							<button
								className="btn btn-primary"
								onClick={props.onCreate}
								disabled={props.disabled}>
								Create
							</button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}
