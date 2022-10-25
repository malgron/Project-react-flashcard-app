import React from "react";

export const Button = ({ children, onClick, type }) => {
	return (
		<button
			type={type ? { type } : 'button'}
			onClick={onClick}
			className="btn btn-primary mb-2 mr-2 mt-2">
			{children}
		</button>
	)
}