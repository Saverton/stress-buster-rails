import React, { useState, useEffect } from 'react';
import useError from '../hooks/useError';
import JournalCard from "./JournalCard";
import JournalSearchForm from "./JournalSearchForm";
import ErrorMessage from './ErrorMessage';
import { PageTitle } from "../styled-components/Title";
import styled from 'styled-components';

const JournalContainer = styled.ul`
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  list-style-type: none;
  background-color: var(--cyan);
  border-radius: 25px;
  margin: 1em;
  padding: 1rem 0.5rem 1.5rem;

  @media (max-width: 500px) {
    margin: 0.5rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

function PreviousJournals () {
  const [ journalList, setJournalList ] = useState([]);
  const [ searchParams, setSearchParams ] = useState({
    searchTerm: '',
    sort: 'date',
    filter: 'all'
  });
  const { error, showError, hideError } = useError();

  const onDelete = id => {
    setJournalList(journalList.filter(journal => journal.id !== id));
  }

  const journalsToDisplay = journalList
  .filter(
    journal => {
      return (journal.quote.content.content.toLowerCase().includes(searchParams.searchTerm.toLowerCase()) ||
      journal.date.toLowerCase().includes(searchParams.searchTerm.toLowerCase()) ||
      journal.body.toLowerCase().includes(searchParams.searchTerm.toLowerCase())) &&
      (searchParams.filter === 'all' || searchParams.filter === journal.therapy.toString())
    }
  )
  .sort(
    (a, b) => b[searchParams.sort] - a[searchParams.sort]
  )
  .map(
    journal => <JournalCard key={journal.id} journal={journal} onDelete={onDelete} onError={showError} />
  );

  // fetch journals from db.json
  useEffect(() => {
    fetch(`/journals`)
      .then(r => {
        if (r.ok) {
          r.json().then(d => {
            console.log(d);
            setJournalList(d);
          });
        } else {
          r.json().then(showError);
        }
      })
  }, [showError]);

  return (
    <div>
      <PageTitle>Your Journey So Far...</PageTitle>
      {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      <JournalContainer className="flex row">
        <JournalSearchForm searchParams={searchParams} setSearchParams={setSearchParams} />
        {journalsToDisplay.length > 0 ? journalsToDisplay : <p>No Journals Found...</p>}
      </JournalContainer>
    </div> 
  );
}

export default PreviousJournals;
