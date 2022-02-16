import ArticlesContainer from "../components/ArticlesContainer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getArticles } from "../utils/api";

const ArticlesPage = (props) => {
  let [articles, setArticles] = useState([]);
  const location = useLocation();
  // let [error, setError] = useState(null);

  useEffect(() => {
    console.log(location.search);
    getArticles(location.search)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search]);

  return (
    <main className="content">
      <ArticlesContainer articles={articles} />
    </main>
  );
};

export default ArticlesPage;
