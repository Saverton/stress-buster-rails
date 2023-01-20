import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
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

function ReplyForm({ commentId, onReply }) {
  const [ content, setContent ] = useState('');
  const user = useContext(UserContext);

  const onChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = e => {
    // post reply
    e.preventDefault();
    fetch(`http://localhost:9292/reply/${commentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: content,
        username: user.username,
        user_id: user.id
      })
    })
      .then(r => r.json())
      .then(data => {
        onReply(data)
        setContent('');
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
