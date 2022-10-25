import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api";

import FormCard from "./FormCard";

export default function EditDeck() {

	const history = useHistory();
	const { deckId, cardId } = useParams();

	const [front, setFront] = useState("Front side of card");
	const [back, setBack] = useState("Back side of card");
	const [currentDeck, setCurrentDeck] = useState(null);
	const [currentCard, setCurrentCard] = useState(null);

	useEffect(() => {

		async function loadCard() {
			try {
				const response = await readDeck(deckId);
				setCurrentDeck(response);
				setCurrentCard(response.cards.find((card) => card.id + '' === cardId));
				setFront(response.cards.find((card) => card.id + '' === cardId).front);
				setBack(response.cards.find((card) => card.id + '' === cardId).back);
			} catch (error) {
				console.log(error);
			}
		}

		loadCard();
	}, [deckId, cardId]);

	const handleCancel = (event) => {

		event.preventDefault();
		history.push(`/decks/${deckId}`);
	}

	const handleSubmit = (event) => {

		event.preventDefault();
		const card = {
			...currentCard,
			front,
			back,
		}
		updateCard(card).then((response) => {

			setCurrentCard(response);
			history.push(`/decks/${deckId}`);
		})
	}

	if (currentDeck && currentCard) {
		return (
			<div>
				<div>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to={`/decks/${deckId}`}>View Deck</Link>
							</li>
							<li className="breadcrumb-item" aria-current="page">
								Edit Page
							</li>
						</ol>
					</nav>
				</div>
				<h2>Edit Card</h2>
				<FormCard
					handleSubmit={handleSubmit}
					front={front}
					back={back}
					setFront={setFront}
					setBack={setBack}
					handleDone={handleCancel}
				/>
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}