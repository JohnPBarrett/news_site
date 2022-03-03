import { useState, useContext } from 'react';
import { postComment } from '../../utils/api';
import UserContext from '../../context/UserContext';

function CommentPosting(props) {
  const [commentBody, setCommentBody] = useState('');
  const { user } = useContext(UserContext);
  const { articleId, setNewComment } = props;

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

    postComment(articleId, data).then(() => {
      setNewComment(false);
    });
  };

  return (
    <div className="comment__submit-container">
      <form className="comment__submit-form" onSubmit={submitComment}>
        <textarea
          type="text"
          className="comment__submit-input"
          placeholder="What are your thoughts?"
          value={commentBody}
          onChange={(e) => handleChange(e)}
          required
          rows={5}
        >
          {' '}
        </textarea>
        <div className="comment__submit-form-button-container">
          <button type="submit" className="comment__submit-form-button btn">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentPosting;
