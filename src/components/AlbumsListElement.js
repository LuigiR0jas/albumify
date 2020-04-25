import React from "react";

import "./styles/AlbumsListElement.css";

export default function AlbumsListElement(props) {
	return (
		<div className="container albumlist-element">
			<div className="row justify-content-center">
				<div className="col-2 align-self-center">
					<div className="row justify-content-end mr-1">
						<h3># {props.album.rank}</h3>
					</div>
				</div>
				<div className="col-2">
					<img
						className="album-art"
						src={props.album.cover.url}
						alt=""
					/>
				</div>
				<div className="col-6 align-self-center">
					<h3>
						{props.album.name} ({props.album.year})
					</h3>
					<h5 className="mt-0">{props.album.artists[0].name}</h5>

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
