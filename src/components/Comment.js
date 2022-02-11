import { UpArrowSVG, DownArrowSVG } from "../assets/ArrowsSVG";
import { convertDate } from "../utils/convertDate";

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
            <div className="votes__container">
              <button className="arrow-button arrow-button__up">
                <UpArrowSVG className="arrow-icon up-arrow" />
              </button>
              <div className="votes-count">{comment.votes} votes</div>
              <button className="arrow-button arrow-button__down">
                <DownArrowSVG className="arrow-icon down-arrow" />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
