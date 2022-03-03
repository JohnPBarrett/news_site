import { useState, useEffect, useRef } from 'react';
import { getArticleComments } from '../../utils/api';
import Comment from './Comment';
import CommentPosting from './CommentPosting';
import './CommentsContainer.css';

function CommentsContainer(props) {
  const { articleId, setCommentsLoaded } = props;
  const componentMounted = useRef(true);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(true);

  useEffect(() => {
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
      .catch((err) => {
        console.log(err);
      });
    return () => {
      componentMounted.current = false;
    };
  }, [articleId, setCommentsLoaded, newComment]);

  return (
    <div className="comment__container">
      <CommentPosting articleId={articleId} comments={comments} setNewComment={setNewComment} />
      {newComment && <Comment comments={comments} />}
    </div>
  );
}

export default CommentsContainer;
