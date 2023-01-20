import React from "react";
import styled from 'styled-components';
import { Button } from '../styled-components/Buttons';
import { Textbox } from '../styled-components/Textbox';

const Input = styled.input`
  border: none;
  border-radius: 4px;
  text-align: center;
  width: 50%;
  max-width: 5rem;
`;

const SubmitButton = styled(Button)`
  color: #FFF;
  background-color: var(--burnt-orange);

  &:hover {
    background-color: white;
    color: #000;
    box-shadow: 0px 0px 2px 2px rgb(255, 255, 255);
    font-weight: bold;
  }
`;

const StyledForm = styled.section`
  background-color: var(--dark-green);
  margin-top: 3em;
  border-radius: 25px;
`;

const Question = styled.div`
  flex-basis: 33.333333%;
  border: 1px solid black;
  padding: .5rem;
  border-radius: 25px;
  min-height: 70px;
  margin: 1em 0 2em 0;
  background-color: var(--grey);
`;

const QuestionSection = styled.section`
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 1em;
  justify-content: center;
  margin-top: 0rem;
`;

const FormSection = styled.section`
  background-color: var(--cyan);
  border-radius: 25px;
`;

const JournalTextbox = styled(Textbox)`
  width: 70%;
`;

const DateInput = styled(Input)`
  margin-left: 12%;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-family: cardo;
  margin-top: 2rem;
  min-width: 8rem;
`;

const SpecialLabel = styled.label`
  margin-left: 12%;
  color:#fff;
  font-size: 28px;
  margin-top: 2rem;
  display: block;
  text-shadow: 2px 2px 5px white;
`;

function JournalForm({ handleSubmit, formState }) {
  const [ formData, setFormData ] = formState;

  const inputData = {
    sleep: { label: 'How many hours did you sleep last night?', max: 24 },
    exercise: {label: 'Time in minutes spent exercising:'},
    nature: {label: 'Time in minutes spent in a Green Space:'},
    social: {label: 'Number of positive social interactions:'},
    mindful: {label: 'Number of mindful breaks:'},
    nutrition: { label: 'Rate how balanced your meals were today:', max: 10 },
    mental: {label: 'Total media consumption:'}
  };

  function onFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function generateInput(fieldName, label, max) {
    return (
      <Question key={`${fieldName}-input`}>
        <label htmlFor={fieldName}>{label}</label>
        <br />
        <Input
          type='number'
          id={fieldName}
          name={fieldName}
          min='0'
          max={max}
          value={formData[fieldName]}
          onChange={onFormChange}
          required
        />
      </Question>
    );
  }

  const metricInputs = Object.keys(inputData).map(
    key => {
      return generateInput(key, inputData[key].label, inputData[key].max || 60 * 24)
    }
  );

  return (
    <StyledForm>
      <form onSubmit={e => handleSubmit(e, formData)}>
        <DateInput
          className="center"
          type="date"
          name="date"
          onChange={onFormChange}
          value={formData.date}
          required
        />
        <br />
        <SpecialLabel>Breathe in... Let it out...</SpecialLabel>
        <br />
        <div className="center">
          <JournalTextbox
            type="text"
            name="body"
            rows="15"
            cols="100"
            value={formData.body}
            onChange={onFormChange}
            required
          />
        </div>
        <br />
        <FormSection>
          <QuestionSection className="flex row center">
            {metricInputs}
            <Question>
              <label htmlFor="therapy">Did you attend therapy?</label>
              <br />
              <Input as="select" id="therapy" name="therapy" onChange={onFormChange} value={formData.therapy} required>
                <option value="">Select an Option</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </Question>
          </QuestionSection>
          <div className="center">
            <SubmitButton>Submit</SubmitButton>
          </div>
        </FormSection>
      </form>
    </StyledForm>
  );
}

export default JournalForm;
