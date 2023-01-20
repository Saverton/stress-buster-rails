import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: var(--cyan);
  margin: 2em;
  border-radius: 10px;
  padding-top: 1rem;

  @media (max-width: 600px) {
    margin: 0.5em;
  }
`;

const JournalHeader = styled.section`
  padding: .5rem;
  border-radius: 25px;
  margin: 0 10%;
  background-color: var(--seafoam-green);
  color: white;

  @media (max-width: 500px) {
    margin: 0 5%;
  }
`;

export { FormContainer, JournalHeader };