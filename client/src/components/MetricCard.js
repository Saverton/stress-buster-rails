import React from 'react';
import styled from 'styled-components';

const StyledMetricCard = styled.div`
  background-color: var(--grey);
  max-width: 35%;
  min-width: 35%;
  border-radius: 25px;
  margin: 1em ;
  padding: 0 20px;
  
  @media (max-width: 500px) {
    margin: 0.25rem 0;
  }
`;

const Metric = styled.p`
  background-color: var(--grey-blue);
  color: white;
  border-radius: 25px;
`;

function MetricCard({ metric }) {
  const { name, measurement, value } = metric;

  return (
    <StyledMetricCard className="center">
      <p><b>{name}:</b></p>
      <Metric>{value} {measurement}</Metric>
    </StyledMetricCard>
  );
}

export default MetricCard;
