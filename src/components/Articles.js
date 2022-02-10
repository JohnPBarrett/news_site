import { getArticles } from "../utils/api";
import { useState, useEffect } from "react";
import { UpArrowSVG, DownArrowSVG } from "../assets/ArrowsSVG";
import { Link, useLocation } from "react-router-dom";

import "./Articles.css";

const Articles = (props) => {
  let [articles, setArticles] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    getArticles(location.search).then(({ articles }) => {
      setArticles([...articles]);
      console.log(articles);
    });
  }, [location]);

  return (
    <main className="content">
      {articles.map((article) => {
        return (
          <article
            className="article"
            key={`${article.title}-${article.article_id}`}
          >
            <div className="article__details">
              <p className="article__topic">Topic: {article.topic}</p>
              <p className="article__author">Posted by {article.author}</p>
              <p className="article__created">Feb</p>
            </div>
            <Link to={`./${article.article_id}`} className="article__title">
              {article.title}
            </Link>
            <div className="article__user-feedback">
              <div className="votes__container">
                <button className="arrow-button arrow-button__up">
                  <UpArrowSVG className="arrow-icon up-arrow" />
                </button>
                <div className="votes-count">{article.votes} votes</div>
                <button className="arrow-button arrow-button__down">
                  <DownArrowSVG className="arrow-icon down-arrow" />
                </button>
              </div>
              <div className="article__comments">
                {article.comment_count} comments
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export default Articles;
