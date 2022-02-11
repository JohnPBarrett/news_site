import { postComment } from "../utils/api";
import { useState } from "react";

const CommentPosting = (props) => {
  let [commentBody, setCommentBody] = useState("");

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const submitComment = (event) => {
    event.preventDefault();

    const data = {
      username: "grumpy19",
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
