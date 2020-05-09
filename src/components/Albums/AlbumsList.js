import React, { Component } from "react";

import collageLogo from "../../images/collage logo.png";
import SpotifyLogoWhite from "../../images/Spotify Logo White.png";

import "./styles/AlbumsList.css";

import AlbumsListElement from "./AlbumsListElement";
import CollageModal from "../Modals/CollageModal";
import PlaylistModalContainer from "../Modals/PlaylistModalContainer";

export default class AlbumsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			prevDisabled: true,
			nextDisabled: false,
			isCollageModalOpen: false,
			isPlaylistModalOpen: false,
			images: props.albumsCoverArt,
			collageImageDataURL: "",
			imgurID: "",
			loadedImagesCount: 0,
			loadingImageFromImgur: true,
		};
	}

	handlePaginationNext = (e) => {
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

	handleOpenModal = (e) => {
		switch (e.target.id) {
			case "OpenCollageModalButton":
				this.setState({ isCollageModalOpen: true });
				break;
			case "OpenPlaylistModalButton":
				this.setState({ isPlaylistModalOpen: true });
				break;
			default:
				break;
		}
	};

	handleCloseModal = (e) => {
		switch (e.target.id) {
			case "CloseCollageModalButton":
				this.setState({ isCollageModalOpen: false });
				break;
			case "ClosePlaylistModalButton":
				this.setState({ isPlaylistModalOpen: false });
				break;
			case "CancelPlaylistCreationButton":
				this.setState({ isPlaylistModalOpen: false });
				break;
			default:
				break;
		}
	};

	triggerDraw = () => {
		if (this.imagesLoaded()) {
			this.draw();
		}
	};

	imagesLoaded = () => {
		return this.state.loadedImagesCount >= this.state.images.length;
	};

	draw = () => {
		let invisibleCanvas = document.getElementById("invisible-canvas");
		let invisibleCanvasContext = invisibleCanvas.getContext("2d");
		let index = 0;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
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
		let imageDataURL = invisibleCanvas.toDataURL("image/jpeg");
		this.setState({
			collageImageDataURL: imageDataURL,
		});
		invisibleCanvas.toBlob((blob) => {
			this.uploadCollage(blob);
		}, "image/jpeg");
	};

	uploadCollage = (collageBlob) => {
		let formData = new FormData();
		formData.append("image", collageBlob);

		fetch("https://api.imgur.com/3/image", {
			method: "POST",
			headers: {
				Authorization: "Client-ID 9bd4654a0ee1f87",
			},
			body: formData,
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					imgurID: response.data.id + ".jpg",
					loadingImageFromImgur: false,
				});
			})
			.catch((error) => console.log(error));
	};

	componentDidMount() {
		this.state.images.forEach((image) => {
			image.onload = () => {
				this.setState({
					loadedImagesCount: this.state.loadedImagesCount + 1,
				});
				if (this.imagesLoaded()) {
					if (document.getElementById("invisibleCanvas")) {
						this.draw();
					}
				}
			};
		});
	}

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
							albums cover art to share with your friends. Also,
							we can create a playlist for you full of the songs
							you like from your albums!
						</p>
					</div>
					<div className="row justify-content-center">
						<button
							id="OpenCollageModalButton"
							className="btn btn-primary btn-sm mr-2"
							onClick={this.handleOpenModal}>
							<img
								className="btn__logo"
								src={collageLogo}
								alt=""
							/>
							{"   "}
							Generate a collage
						</button>
						<CollageModal
							loading={this.state.loadingImageFromImgur}
							isOpen={this.state.isCollageModalOpen}
							onClose={this.handleCloseModal}
							closeButtonID="CloseCollageModalButton"
							draw={this.triggerDraw}
							collageImageURL={this.state.collageImageDataURL}
							imgurID={this.state.imgurID}></CollageModal>

						<button
							id="OpenPlaylistModalButton"
							className="btn btn-primary btn-sm ml-2"
							onClick={this.handleOpenModal}>
							<img
								className="btn__logo"
								src={SpotifyLogoWhite}
								alt=""
							/>
							{"   "}
							Create playlist
						</button>
						<PlaylistModalContainer
							isOpen={this.state.isPlaylistModalOpen}
							onClose={this.handleCloseModal}
							closeButtonID="ClosePlaylistModalButton"
							user={this.props.user}
							albums={this.props.albums}
							access_token={
								this.props.access_token
							}></PlaylistModalContainer>
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
