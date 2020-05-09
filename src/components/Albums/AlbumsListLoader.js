import React from "react";
import ContentLoader from "react-content-loader";

import "./styles/AlbumsListLoader.css";

const AlbumsListLoader = () => (
	<React.Fragment>
		<div className="container ">
			<ContentLoader
				className="albumListLoader"
				speed={1.5}
				width={1140}
				height={340}
				viewBox="0 0 1140 340"
				backgroundColor="#2e2c2c"
				foregroundColor="#686868">
				<rect x="470" y="20" rx="5" ry="5" width="220" height="10" />
				<rect x="521" y="85" rx="5" ry="5" width="220" height="10" />
				<rect x="521" y="181" rx="5" ry="5" width="220" height="10" />
				<rect x="523" y="279" rx="5" ry="5" width="220" height="10" />
				<rect x="424" y="176" rx="0" ry="0" width="69" height="61" />
				<rect x="424" y="75" rx="0" ry="0" width="69" height="61" />
				<rect x="388" y="100" rx="5" ry="5" width="18" height="15" />
				<rect x="423" y="276" rx="0" ry="0" width="69" height="61" />
				<rect x="388" y="199" rx="5" ry="5" width="18" height="15" />
				<rect x="387" y="298" rx="5" ry="5" width="18" height="15" />
				<rect x="521" y="104" rx="5" ry="5" width="143" height="7" />
				<rect x="525" y="203" rx="5" ry="5" width="143" height="7" />
				<rect x="526" y="302" rx="5" ry="5" width="143" height="7" />
				<rect x="522" y="121" rx="5" ry="5" width="215" height="8" />
				<rect x="522" y="222" rx="5" ry="5" width="215" height="8" />
				<rect x="524" y="322" rx="5" ry="5" width="215" height="8" />
			</ContentLoader>
		</div>
	</React.Fragment>
);

export default AlbumsListLoader;
