import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck() {

	const initialFormData = {
		name: "",
		description: "",
	}

	const [formData, setFormData] = useState(initialFormData);
	const history = useHistory();

	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		})
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const { id } = await createDeck(formData);
		history.push(`/decks/${id}`);
	}

	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						Create Deck
					</li>
				</ol>
			</nav>
			<h2>Create New Deck</h2>
			<form onSubmit={handleSubmit} className="form-group">
				<label className="col-form-label" htmlFor="deckName">
					Name
				</label>
				<input
					id="deckName"
					type="text"
					name="name"
					onChange={handleChange}
					className="form-control mb-3"
					value={formData.name}
					placeholder="Name of Deck"
					required
				/>
				<label htmlFor="deckDescription">Description</label>
				<textarea
					id="deckDescription"
					name="description"
					onChange={handleChange}
					className="form-control mb-3"
					value={formData.description}
					rows="4"
					placeholder="Description of deck contents"
					required
				/>
				<button
					type="button"
					onClick={() => history.push("/")}
					className="btn btn-primary mr-2">
					Cancel
				</button>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	)
}