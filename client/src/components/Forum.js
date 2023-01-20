import { useState, useEffect } from "react";
import useError from '../hooks/useError';
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import ErrorMessage from './ErrorMessage';
import { PageTitle } from "../styled-components/Title";
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--burnt-orange);
  margin: 0 20px 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    margin: 0.5rem;
  }
`;

const CommentSection = styled.section`
  width: 50%;
  padding: 15px 10px;
  margin: 20px 0 2rem;
  border-radius: 20px;
  background-color: var(--cyan);

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Heading = styled.h1`
  color: #FFF;
  margin: 0 0 5px 35px;
  text-align: left;
`;

const CommentBox = styled.section`
  background-color: var(--grey-blue);
  width: 50%;
  border-radius: 20px;
  padding: 15px 10px;
  margin: 2rem 0;

  @media (max-width: 500px) {
    width: 90%;
    margin: 1rem 0;
  }
`;

const Comments = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0 0;
  width: 100%;
`;

function Forum() {
  const [comments, setComments] = useState([]);
  const { error, showError, hideError } = useError();

  useEffect(() => {
    fetch(`/comments/0`)
      .then(r => {
        if (r.ok) {
          r.json().then(setComments);
        } else {
          r.json().then(showError);
        }
      });
  }, [showError]);
  
  const addReply = updatedComment => {
    setComments(comments.map(
      comment => {
        if (comment.id === updatedComment.id) {
          return updatedComment;
        } else {
          return comment;
        }
      }
    ));
  };

  const renderComments = () => (
    comments.map((comment) => (
      <Comment comment={comment} key={comment.id} onLike={updateComment} onDelete={deleteComment} onError={showError} onReply={addReply} />
    ))
  );

  const updateComment = (updatedComment) => {
    const updatedCommentList = comments.map(
      comment => {
        if (comment.id === updatedComment.id)
          return updatedComment;
        else
          return comment;
      }
    );
    setComments(updatedCommentList);
  };

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteComment = (deletedComment) => {
    const updatedCommentList = comments.filter(comment => comment.id !== deletedComment.id)
    setComments(updatedCommentList)
  }

  return (
    <div>
      <PageTitle>Forum</PageTitle>
      {error.show ? <ErrorMessage message={error.message} hideError={hideError} /> : ''}
      <Container className="flex column">
        <CommentBox>
          <Heading>Post a Comment</Heading>
          <CommentForm onAddComment={addComment} onError={showError} />
        </CommentBox>
        <CommentSection className="flex column">
          <Heading>Comments</Heading>
          <Comments>{renderComments()}</Comments>
        </CommentSection>
      </Container>
    </div>
  );
}

export default Forum;
