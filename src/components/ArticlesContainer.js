import ArticleRow from "./ArticleRow";

import "./Articles.css";

const ArticlesContainer = (props) => {
  let isHome = props.isHome || false;

  // let [error, setError] = useState(null);

  // if (error) {
  //   return (
  //     <div>
  //       <NotFound />
  //     </div>
  //   );
  // }

  return (
    <>
      {props.articles.map((article) => {
        return (
          <ArticleRow
            article={article}
            key={`${article.article_title}_${article.article_id}`}
            isHome={isHome}
          />
        );
      })}
    </>
  );
};

export default ArticlesContainer;
