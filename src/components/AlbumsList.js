import React, { Component } from "react";

import AlbumsListElement from "./AlbumsListElement";
import AlbumsListLoader from "./AlbumsListLoader";

export default class AlbumsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			prevDisabled: true,
			nextDisabled: false
		};
	}

	handlePaginationNext = e => {
		console.log("to top");

		window.scrollTo(0, 0);

		if (this.state.page >= 1) {
			this.setState({
				page: this.state.page + 1,
				prevDisabled: false
			});

			if (this.props.albums.length == this.state.page + 1) {
				this.setState({
					page: this.state.page + 1,
					nextDisabled: true
				});
			}
		} else {
			this.setState({ page: this.state.page + 1 });
		}
	};

	handlePaginationPrev = e => {
		console.log("to top");

		window.scrollTo(0, 0);

		if (this.state.page == 2) {
			this.setState({
				page: this.state.page - 1,
				prevDisabled: true
			});
		} else {
			if (this.state.page == this.props.albums.length) {
				this.setState({
					page: this.state.page - 1,
					nextDisabled: false
				});
			} else {
				this.setState({ page: this.state.page - 1 });
			}
		}
	};

	componentDidUpdate() {}

	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<h3>These are your favorite albums!</h3>
					</div>
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
				</div>
			</React.Fragment>
		);
	}
}
