import ArticleRow from "./ArticleRow";

import "./Articles.css";

const ArticlesContainer = (props) => {
  return (
    <>
      {props.articles.map((article) => {
        return (
          <ArticleRow
            article={article}
            key={`${article.article_title}_${article.article_id}`}
          />
        );
      })}
    </>
  );
};

export default ArticlesContainer;
