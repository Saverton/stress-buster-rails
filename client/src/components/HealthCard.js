import React from 'react';
import styled from 'styled-components';

const StyledHealthCard = styled.section`
  flex-basis: calc(100.0% / 3);
  border: 1px solid black;
  padding: .5rem;
  border-radius: 25px;
  margin: auto;

  @media (max-width: 500px) {
    min-width: 80%;
    max-width: 80%;
  }
`;

const Metric = styled.div`
  background-color: white;
  color: black;
  margin: 0 20%;
  border-radius: 5px;
`

const colors = {
  sleep: '--grey-blue',
  exercise: '--burnt-red',
  nature: '--dark-green',
  social: '--cyan',
  mindful: '--orange',
  nutrition: '--purple',
  mental: '--seafoam-green'
};

function HealthCard({ data, type }) {
  const { avg, description, measurement } = data;

  return (
    <StyledHealthCard style={{
      backgroundColor: `var(${colors[type]})`
    }}>
      {description}:
      <Metric>
        {`${avg?.toFixed(1) || '\u231B'} ${measurement}`}
      </Metric>
    </StyledHealthCard>
  );
}

export default HealthCard;
