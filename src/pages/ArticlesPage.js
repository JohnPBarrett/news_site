import ArticlesContainer from "../components/ArticlesContainer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getArticles } from "../utils/api";
import LoaderSpinner from "../utils/LoadingSpinner";

const ArticlesPage = (props) => {
  let [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getArticles(location.search)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location.search]);

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <main className="content">
      <ArticlesContainer articles={articles} />
    </main>
  );
};

export default ArticlesPage;
