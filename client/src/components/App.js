import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import useError from '../hooks/useError';
import Header from "./Header";
import ErrorMessage from "./ErrorMessage";
import MainPage from "./MainPage";
import NewJournal from "./NewJournal";
import PreviousJournals from "./PreviousJournals";
import Forum from "./Forum";
import About from "./About"
import Login from "./Login"
import EditJournal from "./EditJournal";


function App() {
  // States
  const [randomQuote, setRandomQuote] = useState({});
  const [currentUser, setCurrentUser] = useState({}); //set to null
  const { error, showError, hideError } = useError();

  // fetch Random Quote and update random quote
  useEffect(() => {
    fetch('/quotes/today')
      .then(r => {
        if (r.ok) {
          r.json().then(setRandomQuote);
        } else {
          r.json().then(showError);
        }
      });
    

    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(setCurrentUser);
      }
    });
  }, [showError]);


  if (!currentUser) return (
    <div>
      <Header onUsername={currentUser} />
      <Login onLogin={setCurrentUser} />
    </div>
  );
  
  return (
    <div>
      <Header currentUser={currentUser} onSetCurrentUser={setCurrentUser}  />
      {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      <Switch>
        <Route exact path="/">
          <MainPage randomQuote={randomQuote} />
        </Route>
        <Route path="/my-journals/new">
          <NewJournal randomQuote={randomQuote}/>
        </Route>
        <Route path="/my-journals/edit/:id">
          <EditJournal />
        </Route>
        <Route path="/my-journals">
          <PreviousJournals />
        </Route>
        <Route path="/community-forum">
          <Forum />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <h1>404 not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
