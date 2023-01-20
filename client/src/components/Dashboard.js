import React, { useState, useEffect, useContext } from 'react';
import HealthCard from './HealthCard';
import useError from '../hooks/useError';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const DashboardHeader = styled.header`
  background-color: var(--burnt-orange);
  align-items: center;
  margin-bottom:5%;
  padding: 1rem;
  /* line-height: 1px; */
  border-top-right-radius: 5px;
  border-bottom: 1px solid;
  color: #000;
`;

const Summary = styled.section`
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

function Dashboard () {
  const [ metricData, setMetricData ] = useState({});
  const { error, showError, hideError } = useError();
  const user = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:9292/average/${user.username}`)
      .then(r => r.json())
      .then(data => {
        setMetricData(data)
      })
      .catch(_ => showError('Server is not available, try again later.'));
  }, [showError, user.username]);

  const averages = {
    sleep: {
      category: 'Sleep',
      description: 'Hours Slept',
      measurement: 'hours'
    },
    nature: {
      category: 'Nature',
      description: 'Time in Green Space',
      measurement: 'mins'
    },
    exercise: {
      category: 'Physical Activity',
      description: 'Time spent Exercising',
      measurement: 'mins'
    },
    social: {
      category: 'Relationships',
      description: 'Number of Positive Social Connections',
      measurement: ''
    },
    mindful: {
      category: 'Mindfulness',
      description: 'Mindful Breaks Taken',
      measurement: ''
    },
    nutrition: {
      category: 'Balanced Nutrition',
      description: 'Balanced Meal Rating',
      measurement: '/ 10'
    },
    mental: {
      category: 'Mental Health',
      description: 'Media Consumption',
      measurement: 'mins'
    }
  }

  Object.keys(averages).forEach( key => {
    averages[key].avg = metricData[key];
  });

  const summary = Object.keys(averages).map(
    (key, idx) => <HealthCard key={`health-card-${idx}`} data={averages[key]} type={key} />
  );

  return (
    <>
      {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      <div className='dashboard'>
        <DashboardHeader id="dashboard-title" className="flex column">
          <h2 className="center no-margin">
            <b>Your</b> 
            <em style={{
              textShadow: '2px 2px 5px white'
            }}> Stress Buster  </em> 
            <b>Dashboard</b>
          </h2>
          <p className="no-margin">Daily Average of Stress Busting Habits</p>
        </DashboardHeader>
        <Summary className="flex row center">
          {summary}
        </Summary>
      </div>
    </>
  );
}

export default Dashboard;
