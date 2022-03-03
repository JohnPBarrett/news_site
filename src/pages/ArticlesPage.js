import { useEffect, useState } from 'react';
import ArticleTopicDropdown from '../components/articles/ArticleTopicDropdown';
import ArticleRow from '../components/articles/ArticleRow';
import { getArticles } from '../utils/api';
import LoaderSpinner from '../utils/LoadingSpinner';
import './ArticlesPage.css';
import randomKey from '../utils/randomKeyGenerator';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState('');
  const [dropDown, setDropDown] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const params = {};
    if (topic !== '' && topic !== 'all') {
      params.topic = topic;
    }
    getArticles(params)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dropDown]);

  return (
    <>
      <ArticleTopicDropdown setDropDown={setDropDown} topic={topic} setTopic={setTopic} />
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <main className="content">
          {articles.map((article) => (
            <ArticleRow article={article} key={`${article.article_title}_${randomKey()}`} />
          ))}
        </main>
      )}
    </>
  );
}

export default ArticlesPage;
