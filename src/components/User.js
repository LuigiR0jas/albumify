import React from "react";

import "./styles/User.css";

export default function User(props) {
	return (
		<div className="container">
			<div className="row justify-content-start align-items-center">
				<div className="col-2">
					<div className="row justify-content-end">
						<img
							className="rounded profilePic"
							src={props.user.avatar}
							alt="Profile picture"
						/>
					</div>
				</div>
				<div className="col-4 align-items-center">
					<p className="m-0 smallText">Logged in as</p>
					<h5>{props.user.displayName}</h5>
				</div>
			</div>
		</div>
	);
}
