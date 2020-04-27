import React, { Component } from "react";

export default class Canvas extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: props.images,
		};
	}

	componentDidMount() {
		this.draw();
	}

	draw = () => {
		var ctx = document.getElementById("canvas").getContext("2d");
		ctx.drawImage(this.state.images[0], 0, 0, 50, 50);
	};

	render() {
		return <canvas id="canvas"></canvas>;
	}
}
