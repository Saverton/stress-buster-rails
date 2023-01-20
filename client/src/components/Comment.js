
import React, { useState, useRef, useContext } from "react";
import { useLongPress } from "use-long-press";
import { UserContext } from '../context/UserContext';
import Reply from './Reply';
import ReplyForm from './ReplyForm';

import { Container, Username } from '../styled-components/CommentContainer';
import styled from 'styled-components';

const Likes = styled.div`
	background-color: #FFF;
	padding: 5px;
	border-radius: 10px;
	margin-left: auto;
	justify-content: space-between;
	align-items: center;

	&:hover {
		box-shadow: 0px 0px 5px 5px #FFF;
    font-weight: bold;
	}
`;

const LikeButton = styled.button`
	background-color: var(--light-seafoam-green);
	height: 30px;
	border-radius: 10px;
	border: none;
	color: gray;
	font-size: 25px;

	&.liked {
		color: #f00;
	}
`;

const DeleteButton = styled.button`
	background-color: white;
	border: none;
	color: black;
	border-radius: 5px;
	padding: .25em;
	margin-left: 5px;

	&:hover {
		background-color: #F00;
    font-weight: bold;
    font-size: 15px;
	}
`;


function Comment({ comment, onLike, onDelete, onError, onReply }) {
	const { id, likes, body, username, liked, user_id: userId, replies } = comment;
  const timer = useRef(undefined);
	const [count, setCount] = useState(undefined);
	const user = useContext(UserContext);

	const handleLike = () => {
    fetch(`comments/${id}/like`, { method: "PATCH" })
			.then(r => {
				if (r.ok) {
          r.json().then(onLike);
        } else {
          r.json().then(onError);
        }
			})
	}

	const handleDelete = () => {
		fetch(`/comments/${id}`, { method: "DELETE" })
			.then(r => {
				if (r.ok) {
					onDelete(comment);
				} else {
					r.json().then(onError);
				}
			});
	}

	const resetTimer = () => {
		setCount(undefined);
		clearInterval(timer.current);
	};

	const longPressCallback = () => {
		resetTimer();
		handleDelete();
	};

	const bind = useLongPress(longPressCallback, {
		onStart: _ => {
			setCount(3);
			timer.current = setInterval(() => {
				setCount(count => count - 1);
			}, 1000);
		},
		onFinish: resetTimer,
		onCancel: resetTimer,
		threshold: 3000,
		captureEvent: true,
		cancelOnMovement: true,
		detect: 'both',
	});

	const replyComponents = replies.map(
		(reply, idx) => <Reply key={`reply-${idx}`} reply={reply} />
	);

	return (
		<>
			<Container className="flex">
				<Username>{username}:</Username>
				<div>{body}</div>
				<Likes className="flex center">
					<div style={{ marginRight: "5px" }}>
						{likes}
					</div>
					<LikeButton onClick={handleLike} className={liked ? 'liked' : ''}>
						{"\u2665"}
					</LikeButton>
				</Likes>
				{userId === user.id ? <DeleteButton {...bind()}>{count ? count : "\u232B"}</DeleteButton> : ''}
			</Container>
			<ReplyForm onReply={onReply} commentId={id} onError={onError} />
			{replyComponents}
		</>
	);
}

export default Comment;
