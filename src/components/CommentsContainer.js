import { useState, useEffect } from "react";
import { getArticleComments } from "../utils/api";
import Comment from "./Comment";
import "./CommentsContainer.css";

const CommentsContainer = (props) => {
  const { articleId } = props;

  let [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleComments(articleId).then((data) => {
      setComments(data.comments);
    });
  }, [articleId]);

  return (
    <div className="comment__container">
      <Comment comments={comments} />
    </div>
  );
};

export default CommentsContainer;
