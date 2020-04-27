import React, { Component } from "react";

export default class Canvas extends Component {
	componentDidMount() {
		this.props.draw();
	}

	render() {
		return (
			<React.Fragment>
				<canvas id="canvas" width="300" height="300"></canvas>
				<canvas
					id="invisible-canvas"
					width="900"
					height="900"
					style={{ display: "none" }}></canvas>
			</React.Fragment>
		);
	}
}
