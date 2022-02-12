import { convertDate } from "../utils/convertDate";
import Votes from "./Votes";

const Comment = (props) => {
  return (
    <>
      {props.comments.map((comment, idx) => {
        return (
          <div className="comment" key={`${comment.author} ${idx}`}>
            <div className="comment__details">
              <div className="comment__author">{comment.author}</div>

              <div className="comment__created-at">
                {convertDate(comment.created_at)}
              </div>
            </div>

            <div className="comment__body">{comment.body}</div>
            <Votes
              id={comment.comment_id}
              votes={comment.votes}
              voteType="comment"
            />
          </div>
        );
      })}
    </>
  );
};

export default Comment;
