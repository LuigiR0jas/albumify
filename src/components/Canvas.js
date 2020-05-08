import React, { Component } from "react";

export default class Canvas extends Component {
	componentDidMount() {
		if (this.props.loading) {
			this.props.draw();
		}
	}

	render() {
		return (
			<canvas
				id="invisible-canvas"
				width="900"
				height="900"
				style={{ display: "none" }}></canvas>
		);
	}
}
