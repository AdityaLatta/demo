"use client";

import React from "react";

const Input = () => {
	const [email, setEmail] = React.useState("");

	return (
		<>
			<input
				type="email"
				placeholder="Email"
				name="email"
				className="border"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
		</>
	);
};

export default Input;
