import { useState, useEffect } from "react";
import { getArticleComments } from "../utils/api";
import Comment from "./Comment";
import CommentPosting from "./CommentPosting";
import "./CommentsContainer.css";

const CommentsContainer = (props) => {
  const { articleId } = props;

  let [comments, setComments] = useState([]);

  useEffect(() => {
    // abort controller added to stop memory leaks
    const controller = new AbortController();
    const signal = controller.signal;

    getArticleComments(articleId, signal)
      .then((data) => {
        setComments(data.comments);
      })
      .catch(() => {});
    return () => controller.abort();
    // .finally(() => {
    //   props.setCommentsLoaded(true);
    // });
  }, [articleId, comments]);

  return (
    <div className="comment__container">
      <CommentPosting articleId={articleId} />
      <Comment comments={comments} />
    </div>
  );
};

export default CommentsContainer;
