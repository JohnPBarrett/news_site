import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import convertDate from '../../utils/convertDate';
import { deleteComment } from '../../utils/api';
import Votes from '../utils/Votes';
import randomKey from '../../utils/randomKeyGenerator';
import UserContext from '../../context/UserContext';
import CommentBody from './CommentBody';

function Comment(props) {
  const { user, token } = useContext(UserContext);
  const { comments, setCommentDeleted } = props;
  const [editMode, setEditMode] = useState({ commentId: -1, editMode: false });
  const [error, setError] = useState('');

  const deleteUserComment = (event) => {
    setError('');
    const { commentid } = event.currentTarget.dataset;

    deleteComment(commentid, token)
      .then(() => setCommentDeleted(true))
      .catch(() => {
        setError('Error in deleting comment');
      });
  };

  const editUserComment = (event) => {
    const commentId = +event.currentTarget.dataset.commentid;

    setEditMode({ commentId: commentId, editMode: true });
  };

  const editButton = (commentId, body) => (
    <button
      type="button"
      className="comment__button"
      onClick={editUserComment}
      data-commentid={`${commentId}`}
      data-body={`${body}`}
    >
      edit
    </button>
  );

  return (
    <>
      {comments.map((comment) => (
        <div className="comment" key={`${comment.author} ${randomKey()}`}>
          <div className="comment__details">
            <div className="comment__author">
              <Link to={`/user/${comment.author}`}>{comment.author}</Link>
            </div>

            <div className="comment__created-at">Posted {convertDate(comment.created_at)}</div>
          </div>
          <CommentBody
            commentBody={comment.body}
            editMode={editMode}
            commentId={comment.comment_id}
            setEditMode={setEditMode}
            setCommentUpdate={setCommentDeleted}
            author={comment.author}
          />

          <div className="comment__interaction-container">
            <Votes id={comment.comment_id} currentVotes={comment.votes} voteType="comment" />
            {error && <p className="error-message">{error}</p>}
            {user === comment.author && (
              <button
                type="button"
                className="comment__button"
                onClick={deleteUserComment}
                data-commentid={`${comment.comment_id}`}
              >
                delete
              </button>
            )}

            {editMode.commentId !== comment.comment_id &&
              user === comment.author &&
              editButton(comment.comment_id, comment.body)}
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;
