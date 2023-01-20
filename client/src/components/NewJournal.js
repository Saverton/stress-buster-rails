import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useError from '../hooks/useError';
import JournalForm from "./JournalForm";
import RandomQuote from "./RandomQuote";
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import { JournalHeader, FormContainer } from '../styled-components/JournalForms';
import { PageTitle } from '../styled-components/Title';
import { UserContext } from '../context/UserContext';
import { DEFAULT_FORM_DATA } from '../constants/formData';

const Prompt = styled.section`
  background-color: var(--burnt-orange);
  border-radius: inherit;

  @media (max-width: 500px) {
    & h2 {
      margin: 0.5em 0;
    }

    & p {
      margin: 0;
    }
  }
`;

function NewJournal ({ randomQuote }) {
  const history = useHistory();
  const [ formData, setFormData ] = useState(DEFAULT_FORM_DATA);
  const [ quote, setQuote ] = useState(randomQuote);
  const { error, showError, hideError } = useError();
  const user = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:9292/quote/${formData.date}`)
      .then(r => r.json())
      .then(setQuote)
      .catch(_ => showError('Server is not available, try again later.'));
  }, [formData.date, showError])

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:9292/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        quote_body: randomQuote.content,
        quote_author: randomQuote.author,
        username: user.username
      }),
    })
      .then((response) => response.json())
      .then(() => {
        history.push('/journals');
      })
      .catch(_ => showError('Failed to save Journal, try again later.'));
  }

  return (
    <div>
      <PageTitle> New Journal Entry</PageTitle> 
      <FormContainer> 
        <JournalHeader className="flex column center">
          <Prompt>
            <h2>Write freely or use our daily quote as a prompt! </h2>
            <p>Reflecting on your day can help release pent up tension. </p>
            <br></br>
          </Prompt>
          <RandomQuote randomQuote={quote} />
        </JournalHeader>
        <JournalForm handleSubmit={handleSubmit} formState={[formData, setFormData]} />
        {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      </FormContainer>
    </div>
  );
}

export default NewJournal;
