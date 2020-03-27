import React from "react";

export default function User(props) {
	return (
		<div className="container">
			<div className="row justify-content-start">
				<div className="col-2">
					<div className="row justify-content-end">
						<img
							className="rounded profilepic"
							src={props.user.avatar}
							alt="Profile picture"
						/>
					</div>
				</div>
				<div className="col-4">
					<p className="m-0 mt-4">Logged in as</p>
					<h1>{props.user.displayName}</h1>
				</div>
			</div>
		</div>
	);
}
