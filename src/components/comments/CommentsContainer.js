import { useState, useEffect, useRef, useContext } from 'react';
import { getArticleComments } from '../../utils/api';
import UserContext from '../../context/UserContext';
import Comment from './Comment';
import CommentPosting from './CommentPosting';
import './CommentsContainer.css';

function CommentsContainer(props) {
  const { user } = useContext(UserContext);
  const { articleId, setCommentsLoaded } = props;
  const componentMounted = useRef(true);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    componentMounted.current = true;
    getArticleComments(articleId)
      .then((data) => {
        if (componentMounted.current) {
          setComments(data.comments);
        }
      })
      .then(() => {
        setCommentsLoaded(true);
        setNewComment(true);
      })
      .catch(() => {
        setError('Error occured whilst fetching comments');
      });
    return () => {
      componentMounted.current = false;
    };
  }, [articleId, setCommentsLoaded, newComment]);

  const userNotLoggedIn = (
    <div className="comment__not-logged-in">
      <div>Log in or sign up to leave a comment</div>
    </div>
  );

  return (
    <div className="comment__container">
      {error && <h2>{error}</h2>}
      {user === 'guest' ? (
        userNotLoggedIn
      ) : (
        <CommentPosting articleId={articleId} comments={comments} setNewComment={setNewComment} />
      )}
      {newComment && <Comment comments={comments} />}
    </div>
  );
}

export default CommentsContainer;
