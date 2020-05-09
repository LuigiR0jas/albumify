import React from "react";
import ContentLoader from "react-content-loader";

const UserLoader = () => (
	<div className="container">
		<div className="row justify-content-start align-items-center">
			<ContentLoader
				speed={1.5}
				width={400}
				height={160}
				viewBox="0 0 400 160"
				backgroundColor="#2e2c2c"
				foregroundColor="#686868">
				<rect x="240" y="53" rx="3" ry="3" width="74" height="8" />
				<rect x="240" y="37" rx="3" ry="3" width="52" height="5" />
				<rect x="171" y="25" rx="5" ry="5" width="56" height="49" />
			</ContentLoader>
		</div>
	</div>
);

export default UserLoader;
