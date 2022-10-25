import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function Card({ currentCards }) {

	const history = useHistory();
	const { deckId } = useParams();

	const [cardCount, setCardCount] = useState(1);
	const [sideOfCard, setSideOfCard] = useState(null);
	const [studyCardCount, setStudyCardCount] = useState(0);
	const [studyCard, setStudyCard] = useState(null);
	const sortedCards = currentCards.sort((a, b) => a.id - b.id);

	useEffect(() => {

		if (currentCards.length > 2) {
			setSideOfCard(true);
		}
		setStudyCard(sortedCards[studyCardCount]);
	}, [currentCards, sortedCards, studyCardCount]);

	const handleFlip = (event) => {

		event.preventDefault();
		setSideOfCard(!sideOfCard);
	}

	const handleNext = (event) => {

		event.preventDefault();
		setSideOfCard(!sideOfCard);
		setCardCount((current) => current + 1);
		setStudyCardCount((current) => current + 1);
		setStudyCard(sortedCards[studyCardCount + 1]);

		if (currentCards.length <= cardCount) {
			if (window.confirm("Restart Cards?")) {
				setCardCount(1);
				setStudyCardCount(0);
				setStudyCard(sortedCards[studyCardCount]);
				history.push(`/decks/${deckId}/study`);
			} else {
				history.push("/");
			}
		}
	}

	const handleAddCards = (event) => {

		event.preventDefault();
		history.push(`/decks/${deckId}/cards/new`);
	}

	if (currentCards) {

		if (sideOfCard === true && studyCard) {
			return (
				<div className="card border-primary mb-3">
					<div className="card-body">
						<h4 className="card-title">
							Card {cardCount} of {currentCards.length}
						</h4>
						<p className="card-text"> {studyCard.front} </p>
						<button onClick={handleFlip} className="btn btn-primary">
							Flip
						</button>
					</div>
				</div>
			)
		}
		if (sideOfCard === false && studyCard) {
			return (
				<div className="card border-primary mb-3">
					<div className="card-body">
						<h4 className="card-title">
							Card {cardCount} of {currentCards.length}
						</h4>
						<p className="card-text"> {studyCard.back} </p>
						<button onClick={handleFlip} className="btn btn-primary mr-3">
							Flip
						</button>
						<button onClick={handleNext} className="btn btn-primary mr-3">
							Next
						</button>
					</div>
				</div>
			)
		} else {
			return (
				<div className="card border-primary">
					<div className="card-body mb-3">
						<h4 className="card-title">Not enough cards.</h4>
						<p className="card-text mb-3">
							You need at least 3 cards to study. There are
							{currentCards.length} in this deck.
						</p>
					</div>
					<button onClick={handleAddCards} className="btn btn-primary">
						+ Add Cards
					</button>
				</div>
			)
		}
	} else {
		return <p>Loading...</p>
	}
}