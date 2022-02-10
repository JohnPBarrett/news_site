import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getArticle, getArticleComments } from "../utils/api";
import Comment from "./Comment";
import "./Article.css";

const Article = () => {
  let [article, setArticle] = useState({});
  let [comments, setComments] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    setArticle([]);
    getArticle(id).then((data) => {
      setArticle(data.article);
    });
  }, [id]);

  useEffect(() => {
    getArticleComments(id).then((data) => {
      setComments(data.comments);
    });
  }, [id]);

  return (
    <main className="content">
      <div className="article-page__container">
        <article className="article-page__article">
          <div className="article-page__article__details">
            <p className="article-page__article__author">
              Posted by {article.author}
            </p>
            <p>{article.created_at}</p>
          </div>
          <div className="article-page__article__title">
            <p>{article.title}</p>
          </div>
          <div className="article-page__article__body">
            <p>{article.body}</p>
          </div>

          <div className="article-page__article__total-comments">
            <p>
              {article.comment_count} comment
              {article.comment_count === 1 ? "" : "s"}
            </p>
          </div>
        </article>
        <div className="article-page__comments">
          <Comment comments={comments} />
        </div>
      </div>
    </main>
  );
};

export default Article;
