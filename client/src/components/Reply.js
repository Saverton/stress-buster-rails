import React from 'react';
import styled from 'styled-components';
import { Container, Username } from '../styled-components/CommentContainer';

const ReplyContainer = styled(Container)`
  width: 70%;
  margin-left: 20%;
  margin-bottom: 1rem;
`;

function Reply({ reply }) {
  const { body, username } = reply;
  return (
    <ReplyContainer className="flex row">
      <Username>{username} : </Username>
      <div>{body}</div>
    </ReplyContainer>
  )
}

export default Reply;