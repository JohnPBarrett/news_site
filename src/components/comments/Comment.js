import { Link } from 'react-router-dom';
import convertDate from '../../utils/convertDate';
import Votes from '../utils/Votes';
import randomKey from '../../utils/randomKeyGenerator';

function Comment(props) {
  const { comments } = props;

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
          <Votes id={comment.comment_id} currentVotes={comment.votes} voteType="comment" />
        </div>
      ))}
    </>
  );
}

export default Comment;
