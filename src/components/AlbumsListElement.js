import React from "react";

import "./styles/AlbumsListElement.css";

import afterlaughter from "../images/After Laughter.jpg";

export default function AlbumsListElement() {
	return (
		<div className="container">
			<div className="row albumlist-element">
				<div className="col-2 align-self-center">
					<div className="row justify-content-center">
						<h1>#1</h1>
					</div>
				</div>
				<div className="col-2">
					<img className="album-art" src={afterlaughter} alt="" />
				</div>
				<div className="col-8 align-self-center">
					<h1>After Laughter (2017)</h1>
					<h4 className="mt-0">Paramore</h4>

					<p> ⭐⭐⭐⭐⭐ (97% calculated rating) </p>
				</div>
			</div>
		</div>
	);
}
