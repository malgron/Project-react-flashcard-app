import React from "react";

export default function FormCard({
	handleSubmit,
	front,
	setFront,
	back,
	setBack,
	handleDone,
}) {
	return (
		<form onSubmit={handleSubmit} className="form-group">
			<label htmlFor="front">Front</label>
			<textarea
				className="form-control"
				rows="3"
				required
				value={front}
				onChange={(event) => setFront(event.target.value)}
			/>
			<label htmlFor="back">Back</label>
			<textarea
				className="form-control"
				rows="3"
				required
				value={back}
				onChange={(event) => setBack(event.target.value)}
			/>
			<button onClick={handleDone} className="btn btn-secondary mr-2">
				Done
			</button>
			<button type="submit" className="btn btn-primary mr-2">
				Save
			</button>
		</form>
	)
}