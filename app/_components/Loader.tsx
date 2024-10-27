import React from "react";

const Loader = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="animate-spin rounded-full h-20 w-20 border-4 border-t-transparent border-gray-900"></div>
		</div>
	);
};

export default Loader;
