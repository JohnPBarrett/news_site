import { useEffect, useState } from 'react';
import ParamDropdown from '../components/articles/ParamDropdown';
import ArticleRow from '../components/articles/ArticleRow';
import { getArticles, getTopics } from '../utils/api';
import LoaderSpinner from '../utils/LoadingSpinner';
import './ArticlesPage.css';
import randomKey from '../utils/randomKeyGenerator';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topicFiltered, setTopicFiltered] = useState('');
  const [topics, setTopics] = useState([]);
  const [dropDown, setDropDown] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const params = {};
    if (topicFiltered !== '' && topicFiltered !== 'all') {
      params.topic = topicFiltered;
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

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(
        data.topics.map((topic) => ({
          value: topic.slug
        }))
      );
    });
  }, []);

  return (
    <>
      <ParamDropdown
        setDropDown={setDropDown}
        values={topics}
        selection={topicFiltered}
        setSelection={setTopicFiltered}
      />
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
