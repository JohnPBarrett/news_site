import { useState, useEffect, useRef } from "react";
import { getArticleComments } from "../utils/api";
import Comment from "./Comment";
import CommentPosting from "./CommentPosting";
import "./CommentsContainer.css";

const CommentsContainer = (props) => {
  const { articleId, setCommentsLoaded } = props;
  const componentMounted = useRef(true);

  let [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleComments(articleId)
      .then((data) => {
        if (componentMounted.current) {
          setComments(data.comments);
        }
      })
      .then(() => {
        setCommentsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      componentMounted.current = false;
    };
  }, [articleId, setCommentsLoaded]);

  return (
    <div className="comment__container">
      <CommentPosting articleId={articleId} />
      <Comment comments={comments} />
    </div>
  );
};

export default CommentsContainer;
