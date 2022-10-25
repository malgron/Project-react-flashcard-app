import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { deleteDeck, listDecks } from "../utils/api/index";
import { Button } from "./Button";


export default function Home() {

    const [deckList, setDeckList] = useState([]);
    const history = useHistory([]);

    useEffect(() => {
		async function loadDecks() {
			try {
				const response = await listDecks();
				setDeckList(response);
			} catch (error) {
				console.log(error);
			}
		}
		loadDecks();
	}, []);

    if(deckList) {
        return (
			<div>
				<div>
					<Link to="/decks/new">
						<Button>Create Deck</Button>
					</Link>
				</div>
				{deckList.map((deck) => (
					<div key={deck.id} className="card mb-3">
						<div className="card-body">
							<h4 className="card-title">{deck.name}</h4>
							<h6 className="card-subtitle mb-2 text-muted">
								{deck.cards.length} cards
							</h6>
							<p className="card-text">{deck.description}</p>
							<Link to={`/decks/${deck.id}`}>
								<Button>View</Button>
							</Link>
							<button
								className="btn btn-danger"
								onClick={() => {
									if (window.confirm("Delete this deck?")) {
										deleteDeck(`${deck.id}`)
										history.go("/");
									}
								}}>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		)
    } else {
        return <p> Loading...</p>
    }
}


