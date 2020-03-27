import React from "react";

import "./styles/AlbumsListElement.css";

import afterlaughter from "../images/After Laughter.jpg";

export default function AlbumsListElement(props) {
	return (
		<div className="container">
			<div className="row albumlist-element">
				<div className="col-2 align-self-center">
					<div className="row justify-content-center">
						<h1># {props.rank}</h1>
					</div>
				</div>
				<div className="col-2">
					<img
						className="album-art"
						src={props.album.cover.url}
						alt=""
					/>
				</div>
				<div className="col-8 align-self-center">
					<h1>
						{props.album.name} ({props.album.year})
					</h1>
					<h4 className="mt-0">{props.album.artists[0].name}</h4>

					<p>
						{" "}
						{props.album.metrics.score} (
						{props.album.metrics.ratio * 100} / 100 calculated
						rating)
					</p>
				</div>
			</div>
		</div>
	);
}
