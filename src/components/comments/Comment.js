import convertDate from '../../utils/convertDate';
import Votes from '../utils/Votes';

function Comment(props) {
  const { comments } = props;
  const randomKey = () => Math.floor(Math.random() * 100000);
  return (
    <>
      {comments.map((comment) => (
        <div className="comment" key={`${comment.author} ${randomKey()}`}>
          <div className="comment__details">
            <div className="comment__author">{comment.author}</div>

            <div className="comment__created-at">{convertDate(comment.created_at)}</div>
          </div>

          <div className="comment__body">{comment.body}</div>
          <Votes id={comment.comment_id} currentVotes={comment.votes} voteType="comment" />
        </div>
      ))}
    </>
  );
}

export default Comment;
