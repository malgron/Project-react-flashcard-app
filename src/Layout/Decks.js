import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

import { Button } from "./Button";

export default function Deck() {

	const { deckId } = useParams();
	const history = useHistory();
	const { url } = useRouteMatch();
	const [currentDeck, setCurrentDeck] = useState(undefined);
	const [currentCards, setCurrentCards] = useState(undefined);

	useEffect(() => {
		const abortController = new AbortController();

		async function loadCurrentDeck() {
			try {
				const deckToSet = await readDeck(deckId, abortController.signal);
				setCurrentDeck(deckToSet);
				const { cards } = deckToSet;
				setCurrentCards(cards);
			} catch (error) {
				console.log("loadCurrentDeck Aborted");
			}
		}

		loadCurrentDeck();
		return () => abortController.abort();
	}, [deckId])

	if (currentDeck && currentCards) {
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							View Deck
						</li>
					</ol>
				</nav>
				<div>
					<h2> {currentDeck.name} </h2>
					<h4> {currentDeck.description} </h4>
					<Link to={`${url}/edit`}>
						<Button>Edit Deck</Button>
					</Link>
					<Link to={`${url}/study`}>
						<Button>Study Deck</Button>
					</Link>
					<Link to={`${url}/cards/new`}>
						<Button>Add Cards</Button>
					</Link>
					<button
						className="btn btn-danger"
						onClick={() => {
							if (window.confirm("Delete this deck?")) {
								deleteDeck(currentDeck.id);
								history.push("/");
							}
						}}>
						Delete
					</button>
				</div>
				<div>
					{currentCards.map((card) => (
						<div key={card.id}>
							<div className="card border-primary mb-3">
								<div className="card-body">
									<h4 className="card-text text-danger">Front</h4>
									<p className='card-text'>{card.front}</p>
									<h4 className="card-text text-danger">Back</h4>
									<p className='card-text'>{card.back}</p>
									<Link to={`/decks/${currentDeck.id}/cards/${card.id}/edit`}>
										<Button>Edit Card</Button>
									</Link>
									<button
										className="btn btn-danger"
										onClick={() => {
											if (window.confirm("Delete this card?")) {
												deleteCard(`${card.id}`);
												window.location.reload();
												history.push(`/decks/${deckId}`);
											}
										}}>
										Delete Card
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}