import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-left: 50%;
`;

const ReplyInput = styled.input`
  background-color: var(--grey);
  border: none;
  border-radius: 10px;
  padding: 0.25rem;
  margin: 0.75rem 0;
  width: 60%;
`;

const ReplySubmit = styled.input`
  background-color: transparent;
  border: none;
`

function ReplyForm({ commentId, onReply, onError }) {
  const [ content, setContent ] = useState('');

  const onChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = e => {
    // post reply
    e.preventDefault();
    fetch(`/comments/${commentId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: content
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(onReply);
          setContent('');
        } else {
          r.json().then(onError);
        }
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <ReplyInput
          type="text"
          placeholder="Enter your reply"
          value={content}
          onChange={onChange}
        />
        <ReplySubmit
          type="submit"
          value="Reply"
        />
      </Form>
    </div>
  );
}

export default ReplyForm;
