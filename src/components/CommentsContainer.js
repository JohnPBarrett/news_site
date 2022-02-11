import { useState, useEffect } from "react";
import { getArticleComments } from "../utils/api";
import Comment from "./Comment";
import CommentPosting from "./CommentPosting";
import "./CommentsContainer.css";

const CommentsContainer = (props) => {
  const { articleId } = props;

  let [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleComments(articleId).then((data) => {
      setComments(data.comments);
    });
  }, [articleId, comments]);

  return (
    <div className="comment__container">
      <CommentPosting articleId={articleId} />
      <Comment comments={comments} />
    </div>
  );
};

export default CommentsContainer;
