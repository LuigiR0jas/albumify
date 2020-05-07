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
								className="form-control"
								id="FormPlaylistName"
								aria-describedby="Name"
								defaultValue="My Top 10 Albums"
								readOnly={props.readOnly}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="FormPlaylistDescription">
								Description
							</label>
							<textarea
								className="form-control"
								id="FormPlaylistDescription"
								rows="4"
								defaultValue="A playlist with my favorite songs of my top 10 albums of all time! Created with Albumify."
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
						<button
							className="btn btn-primary"
							href={props.playlistURL}>
							Go to Playlist
						</button>
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
								onClick={props.onCreate}>
								Create
							</button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}
