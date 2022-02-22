import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticlesContainer from "../components/ArticlesContainer";
import LoadingSpinner from "../utils/LoadingSpinner";

const Home = () => {
  let [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles("?limit=4&sort_by=created_at")
      .then((data) => {
        setArticles(data.articles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="content">
      <ArticlesContainer articles={articles} isHome={true} />
    </div>
  );
};

export default Home;
