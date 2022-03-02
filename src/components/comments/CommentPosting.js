import { useState, useContext } from 'react';
import { postComment } from '../../utils/api';
import UserContext from '../../context/UserContext';

function CommentPosting(props) {
  const [commentBody, setCommentBody] = useState('');
  const { user } = useContext(UserContext);
  const { articleId } = props;

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const submitComment = (event) => {
    event.preventDefault();

    const data = {
      username: user,
      body: commentBody
    };

    setCommentBody('');
    postComment(articleId, data);
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentPosting;
