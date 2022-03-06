import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import convertDate from '../../utils/convertDate';
import { deleteComment } from '../../utils/api';
import Votes from '../utils/Votes';
import randomKey from '../../utils/randomKeyGenerator';
import UserContext from '../../context/UserContext';

function Comment(props) {
  const { user, token } = useContext(UserContext);
  const { comments, setCommentDeleted } = props;
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

          <div className="comment__body">{comment.body}</div>
          <div className="comment__interaction-container">
            <Votes id={comment.comment_id} currentVotes={comment.votes} voteType="comment" />
            {error && <div>{error}</div>}
            {user === comment.author && (
              <button
                type="button"
                className="comment__delete"
                onClick={deleteUserComment}
                data-commentid={`${comment.comment_id}`}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;
