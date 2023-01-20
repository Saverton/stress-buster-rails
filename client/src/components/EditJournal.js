import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useError from '../hooks/useError';
import JournalForm from "./JournalForm";
import RandomQuote from "./RandomQuote";
import ErrorMessage from './ErrorMessage';
import { JournalHeader, FormContainer } from '../styled-components/JournalForms';
import { PageTitle } from '../styled-components/Title';
import { DEFAULT_FORM_DATA } from '../constants/formData';

function EditJournal () {
  const { id } = useParams();
  const [ formData, setFormData ] = useState(DEFAULT_FORM_DATA);
  const history = useHistory();
  const { error, showError, hideError } = useError();

  useEffect(() => {
    fetch(`/journals/${id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(setFormData);
        } else {
          r.json().then(showError);
        }
      });
  }, [id, showError]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`/journals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          history.push('/journals');
        } else {
          r.json().then(showError);
        }
      });
  }

  return (
    <div>
      <PageTitle>Edit Journal Entry</PageTitle>
      <FormContainer> 
        <br />
        <JournalHeader>
          <RandomQuote randomQuote={formData.quote} />
        </JournalHeader>
        <br />
        <JournalForm handleSubmit={handleSubmit} formState={[formData, setFormData]} />
        {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      </FormContainer>
    </div>
  );
}

export default EditJournal;
