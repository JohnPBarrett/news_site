import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import ArticleRow from '../components/articles/ArticleRow';
import LoadingSpinner from '../utils/LoadingSpinner';

function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const paramQuery = {
      limit: 10,
      sort_by: 'created_at'
    };
    getArticles(paramQuery)
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
      {articles.map((article) => (
        <ArticleRow article={article} key={`${article.article_title}_${article.article_id}`} />
      ))}
    </div>
  );
}

export default Home;
