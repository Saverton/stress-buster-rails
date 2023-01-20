import React from 'react';
import styled from 'styled-components';

const Quote = styled.blockquote`
  margin: 1rem 2rem;
  font-size: larger;
  padding: 1rem;
  line-height: 1.5em;
  box-shadow: 10px 10px 5px black;
  border-radius: 10px;
  background-color: var(--grey-blue);
`;

function RandomQuote ({ randomQuote }){
  const {author, content} = randomQuote;

  return (
    <Quote>
      &ldquo;{content}&rdquo; <footer>&mdash; {author}</footer>
    </Quote>
  );
}

export default RandomQuote;
