import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useError from '../hooks/useError';
import JournalForm from "./JournalForm";
import RandomQuote from "./RandomQuote";
import ErrorMessage from './ErrorMessage';
import { JournalHeader, FormContainer } from '../styled-components/JournalForms';
import { PageTitle } from '../styled-components/Title';
import { DEFAULT_FORM_DATA } from '../constants/formData';

function EditJournal ({ randomQuote }) {
  const { id } = useParams();
  const [ formData, setFormData ] = useState(DEFAULT_FORM_DATA);
  const history = useHistory();
  const { error, showError, hideError } = useError();

  useEffect(() => {
    fetch(`http://localhost:9292/journal/${id}`)
      .then(r => r.json())
      .then(data => setFormData(data))
      .catch(_ => showError('Server is not available, try again later.'));
  }, [id, showError]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:9292/journals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then(() => {
        history.push('/journals');
      })
      .catch(_ => showError('Unable to save to server, try again later.'));
  }

  return (
    <div>
      <PageTitle>Edit Journal Entry</PageTitle>
      <FormContainer> 
        <br />
        <JournalHeader>
          <RandomQuote randomQuote={randomQuote} />
        </JournalHeader>
        <br />
        <JournalForm handleSubmit={handleSubmit} formState={[formData, setFormData]} />
        {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      </FormContainer>
    </div>
  );
}

export default EditJournal;
