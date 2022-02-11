import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticlesContainer from "./ArticlesContainer";

const Home = () => {
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles("?limit=4&sort_by=created_at").then((data) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <div className="content">
      <ArticlesContainer articles={articles} isHome={true} />
    </div>
  );
};

export default Home;
