import React, { Component } from "react";

import collageLogo from "../images/collage logo.png";

import "./styles/AlbumsList.css";

import AlbumsListElement from "./AlbumsListElement";
import CollageModal from "./CollageModal";

export default class AlbumsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			prevDisabled: true,
			nextDisabled: false,
			isOpen: false,
			images: props.albumsCoverArt,
			collageImageURL: "",
		};
	}

	handlePaginationNext = (e) => {
		console.log("to top");

		window.scrollTo(0, 0);

		if (this.state.page >= 1) {
			this.setState({
				page: this.state.page + 1,
				prevDisabled: false,
			});

			if (this.props.albums.length == this.state.page + 1) {
				this.setState({
					page: this.state.page + 1,
					nextDisabled: true,
				});
			}
		} else {
			this.setState({ page: this.state.page + 1 });
		}
	};

	handlePaginationPrev = (e) => {
		console.log("to top");

		window.scrollTo(0, 0);

		if (this.state.page == 2) {
			this.setState({
				page: this.state.page - 1,
				prevDisabled: true,
			});
		} else {
			if (this.state.page == this.props.albums.length) {
				this.setState({
					page: this.state.page - 1,
					nextDisabled: false,
				});
			} else {
				this.setState({ page: this.state.page - 1 });
			}
		}
	};

	handleOpenCollageModal = (e) => {
		this.setState({
			isOpen: true,
		});
	};

	handleCloseCollageModal = (e) => {
		this.setState({
			isOpen: false,
		});
	};

	draw = () => {
		let canvasContext = document.getElementById("canvas").getContext("2d");
		let invisibleCanvasContext = document
			.getElementById("invisible-canvas")
			.getContext("2d");
		let invisibleCanvas = document.getElementById("invisible-canvas");
		let index = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				canvasContext.drawImage(
					this.state.images[index],
					j * 100,
					i * 100,
					100,
					100
				);
				invisibleCanvasContext.drawImage(
					this.state.images[index],
					j * 300,
					i * 300,
					300,
					300
				);
				index++;
			}
		}
		let imageURL = invisibleCanvas.toDataURL();
		this.setState({
			collageImageURL: imageURL,
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<h3>These are your favorite albums!</h3>
					</div>
					<div className="row justify-content-center">
						<p className="text-center paddedText">
							Now you can generate a collage of your favorite
							albums cover art to share with your friends.
							{/* Also,
							we can create a playlist for you full of the songs
							you like from your albums! */}
						</p>
					</div>
					<div className="row justify-content-center">
						<button
							className="btn btn-primary btn-sm mr-2"
							onClick={this.handleOpenCollageModal}>
							<img
								className="btn__logo"
								src={collageLogo}
								alt=""
							/>
							{"   "}
							Generate a collage
						</button>
						<CollageModal
							isOpen={this.state.isOpen}
							onClose={this.handleCloseCollageModal}
							draw={this.draw}
							collageImageURL={
								this.state.collageImageURL
							}></CollageModal>

						{/* <button className="btn btn-primary btn-sm ml-2">
							<img
								className="btn__logo"
								src={SpotifyLogoWhite}
								alt=""
							/>
							{"   "}
							Create playlist
						</button> */}
					</div>
					<br />
					<div className="row justify-content-center">
						<div className="col">
							<div className="row justify-content-center">
								<button
									disabled={this.state.prevDisabled}
									onClick={this.handlePaginationPrev}
									className="btn btn-outline-dark">
									← Prev
								</button>
							</div>
						</div>
						<div className="col">
							<div className="row justify-content-center">
								<button
									disabled={this.state.nextDisabled}
									onClick={this.handlePaginationNext}
									className="btn btn-outline-dark">
									Next →
								</button>
							</div>
						</div>
					</div>
					{this.props.albums[this.state.page - 1].map(
						(album, index) => {
							return (
								<AlbumsListElement
									key={album.id}
									album={album}></AlbumsListElement>
							);
						}
					)}

					<br />
					<br />
					<div className="row justify-content-center pb-4">
						<div className="col">
							<div className="row justify-content-center">
								<button
									disabled={this.state.prevDisabled}
									onClick={this.handlePaginationPrev}
									className="btn btn-outline-dark">
									← Prev
								</button>
							</div>
						</div>
						<div className="col">
							<div className="row justify-content-center">
								<button
									disabled={this.state.nextDisabled}
									onClick={this.handlePaginationNext}
									className="btn btn-outline-dark">
									Next →
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
