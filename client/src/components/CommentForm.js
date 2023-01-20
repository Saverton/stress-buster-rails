import { useState } from "react";
import styled from 'styled-components';
import { Button } from '../styled-components/Buttons';
import { Textbox } from '../styled-components/Textbox';

const Container = styled.div`
  align-items: center;
  padding: 0 50px;
`;

const CommentTextbox = styled(Textbox)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  background-color: var(--burnt-orange);
  color: #FFF;
  margin-bottom: 1rem;

  &:hover {
    background-color: #FFF;
    color: var(--burnt-orange);
    box-shadow: 0 0 3px 3px #FFF;
  }

  @media (max-width: 500px) {
    margin: 0;
  }
`;

function CommentForm({ onAddComment, onError }) {
  const [comment, setComment] = useState("");
 
  const handleCommentFormSubmit = e => {
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: comment
      }),
    };
    fetch(`/comments`, configObject)
      .then(r => {
        if (r.ok) {
          r.json().then(onAddComment);
          setComment('');
        } else {
          r.json().then(onError);
        }
      });
  };
  
  return (
    <Container className="flex column">
      <CommentTextbox
        rows="5"
        cols="100"
        placeholder="Enter comment here..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <SubmitButton onClick={handleCommentFormSubmit}>
        Submit!
      </SubmitButton>
    </Container>
  );
}
  
export default CommentForm;

