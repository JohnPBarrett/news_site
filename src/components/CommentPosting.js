import { postComment } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const CommentPosting = (props) => {
  let [commentBody, setCommentBody] = useState("");
  let { user, setUser } = useContext(UserContext);

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const submitComment = (event) => {
    event.preventDefault();

    const data = {
      username: user,
      body: commentBody,
    };

    setCommentBody("");
    postComment(props.articleId, data);
  };

  return (
    <div className="comment__submit-container">
      <form className="comment__submit-form" onSubmit={submitComment}>
        <input
          type="text"
          className="comment__submit-input"
          placeholder="What are your thoughts?"
          value={commentBody}
          onChange={(e) => handleChange(e)}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CommentPosting;
