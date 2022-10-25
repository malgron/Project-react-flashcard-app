import React from "react";
import { Route, Switch } from 'react-router-dom';

import Header from "./Header";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";
import Study from "./Study";
import EditDeck from "./EditDeck";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";
import NotFound from "./NotFound";



function Layout() {

  return (
    <div className="container">
      <Header />
        <Switch>
          <Route exact path ="/">            
            <Home />
          </Route>
          <Route exact path ="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
					  <Decks /> 
				  </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
					  <CreateCard /> 
				  </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
					  <EditCard /> 
				  </Route>
          <NotFound />
        </Switch>
    </div>
  );
}

export default Layout;
