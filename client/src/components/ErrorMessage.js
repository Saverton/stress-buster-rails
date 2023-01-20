import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Error = styled.div`
  background-color: red;
  color: white;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
  border: 2px solid white;
  overflow: clip;
  transition: height 0.5s ease-out;

  &.hidden {
    height: 0px;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #FFF;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
`;

function ErrorMessage({ message, hideError }) {
  const [ hidden, setHidden ] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onClose = () => {
    setHidden(true);

    setTimeout(() => {
      hideError();
    }, 500);
  };

  return (
    <Error className={`${hidden ? 'hidden' : ''} flex row`}>
      <p>ERROR! {message}</p>
      <CloseButton onClick={onClose}>{"\u2715"}</CloseButton>
    </Error>
  );
}

export default ErrorMessage;
