import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "./Card";

export default function Study() {

	const params = useParams();
	const [currentDeck, setCurrentDeck] = useState(null);
	const [currentCards, setCurrentCards] = useState(null);

	useEffect(() => {
		async function loadDeck() {
			setCurrentDeck([]);
			setCurrentCards([]);
			try {
				const response = await readDeck(params.deckId);
				setCurrentDeck(response);
				const { cards } = response;
				setCurrentCards(cards);
			} catch (error) {
				console.log(error);
			}
		}

		loadDeck();
	}, [params]);

	if (currentDeck) {
		return (
			<div>
				<div>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
							</li>
							<li className="breadcrumb-item active">Study Deck</li>
						</ol>
					</nav>
				</div>
				<div>
					<h1>{currentDeck.name}: Study</h1>
				</div>
				<Card currentCards={currentCards}></Card>
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}