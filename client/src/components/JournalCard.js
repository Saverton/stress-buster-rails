import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import MetricCard from './MetricCard';
import { Button } from '../styled-components/Buttons';
import { journalSample } from '../helpers/journalSample';

const JournalButton = styled(Button)`
  background-color: var(--grey);
  width: 30%;
  font-family: inherit;

  &:hover {
    background-color: var(--wine-purple);
    color: var(--grey);
  }
`;

const Card = styled.li`
  border: 1px solid;
  max-width: 45%;
  min-width: 45%;
  flex-wrap: wrap;
  border-radius: 10px;
  background-color: var(--light-green);
  box-shadow: 0px 0px 2px 2px;
  max-height: 100rem;
  min-height: 50rem;
  transition-property: max-height, min-height;
  transition-duration: 1s, 1s;
  transition-timing-function: ease, ease;
  overflow: clip;

  &.hidden {
    max-height: 12rem;
    min-height: 10rem;
  }

  @media (max-width: 500px) {
    max-width: 80%;
    min-width: 80%;
  }
`;

const Date = styled.div`
  background-color: var(--grey);
  width: 30%;
  margin: 1rem;
`;

const Quote = styled.div`
  background-color: var(--grey-blue);
  border-radius: 50px;
  margin: 0 10% 1rem;
  padding: 5px;
  box-shadow: 10px 10px 5px black;
  color: #FFF;
`;

const Thoughts = styled.div`
  background-color: var(--grey);
  border-radius: 50px;
  margin: 10px 5% 1rem;
  padding: 5px 0;
  color: #000;
`;

const Metrics = styled.div`
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Buttons = styled.div`
  justify-content: space-evenly;
`;

const JournalHeader = styled.div`
  align-items: center;
  justify-content: space-between;
`;

const ExpandButton = styled.button`
  background-color: var(--grey);
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  height: fit-content;
  margin-right: 1rem;
`;

function JournalCard ({ journal, onDelete, onError }){
  const { date, body, id } = journal;
  const { content, author } = journal.quote.content;
  const history = useHistory();
  const [ hidden, setHidden ] = useState(true);

  const summary = {
    sleep: {
      name: 'Sleep', measurement: 'hours'
    },
    exercise: {
      name: 'Exercise', measurement: 'minutes'
    },
    nature: {
      name: 'Nature', measurement: 'minutes'
    },
    social: {
      name: 'Positive Interactions', measurement: ''
    },
    mindful: {
      name: 'Mindful Breaks', measurement: ''
    },
    nutrition: {
      name: 'Nutrition', measurement: '/ 10'
    },
    mental: {
      name: 'Media Consumption', measurement: 'minutes'
    }
  }

  const onEditClick = () => {
    history.push(`journals/edit/${id}`);
  }

  const onDeleteClick = () => {
    fetch(`/journals/${id}`, {
      method: 'DELETE'
    })
      .then(r => {
        if (r.ok) {
          onDelete(id);
        } else {
          r.json().then(onError);
        }
      });
  }

  const metricCards = Object.keys(summary).map(
    (key, idx) => {
      summary[key].value = journal[key];
      return <MetricCard key={`metric-card-${idx}`} metric={summary[key]} />
    }
  );

  metricCards.push(
    <MetricCard key={'metric-card-7'} metric={{
      name: 'Attended Therapy',
      measurement: '',
      value: journal.therapy ? 'Yes' : 'No'
    }} />
  );

  return (
    <Card className={hidden ? 'hidden' : ''}>
      <JournalHeader className="flex row">
        <Date className="center">{date}</Date>
        <ExpandButton onClick={() => setHidden(hidden => !hidden)}>{hidden ? '˅' : '\u02C4'}</ExpandButton>
      </JournalHeader>
      {hidden
        ? ''
        : (
            <Quote className="center">
              <p><b>Journal Prompt:</b></p>
              <p>"{content}"</p>
              <p> - {author}</p>
            </Quote>
          )
      }
      <Thoughts className="center">
        <p>My thoughts: </p>
        <p>{hidden ? journalSample(body) : body}</p>
      </Thoughts>
      {hidden
        ? ''
        : (
          <>
            
            <Metrics className="flex row">
              {metricCards}
            </Metrics>
            <Buttons className="flex row">
              <JournalButton onClick={onEditClick}>Edit Journal</JournalButton>
              <JournalButton onClick={onDeleteClick}>Delete Journal</JournalButton>
            </Buttons>
          </>
        )
      }
    </Card>
  );
}

export default JournalCard;
