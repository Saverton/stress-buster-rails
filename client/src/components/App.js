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
import { UserContext } from "../context/UserContext";


function App() {
  // States
  const [randomQuote, setRandomQuote] = useState([]);
  const [currentUser, setCurrentUser] = useState(""); //set to null
  const { error, showError, hideError } = useError();

  // fetch Random Quote and update random quote
  useEffect(() => {
    // fetch('/quotes/today')
    //   .then(r => {
    //     if (r.ok) {
    //       r.json().then(console.log);
    //     } else {
    //       r.json().then(console.log);
    //     }
    //   });

    fetch('/comments/1/like', 
    {
      method: 'PATCH',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({
      //   body: "hello world"
      // })
    }
    )
      .then(r => {
        console.log(r.status)
        r.json().then(console.log);
      })
    

      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((data) => setCurrentUser(data));
        }
      });

    // fetch('http://localhost:9292/users/test-user')
    //   .then(r => r.json())
    //   .then(data => setCurrentUser(data))
    //   .catch(_ => showError('Server is not available, try again later.'));
  }, []);


  if (!currentUser) return (
  <div>
    <Header onUsername={currentUser} />
    <Login onLogin={setCurrentUser} />
  </div>
  )
  
  return (
    <div>
      <Header onSetCurrentUser={setCurrentUser}  />
      {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      <UserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <MainPage randomQuote={randomQuote} />
          </Route>
          <Route path="/journals/new">
            <NewJournal randomQuote={randomQuote}/>
          </Route>
          <Route path="/journals/edit/:id">
            <EditJournal randomQuote={randomQuote} />
          </Route>
          <Route path="/journals">
            <PreviousJournals />
          </Route>
          <Route path="/forum">
            <Forum />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <h1>404 not found</h1>
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
