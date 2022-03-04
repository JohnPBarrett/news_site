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
  const [sorting, setSorting] = useState('');
  const [topics, setTopics] = useState([]);

  const sortingValues = [
    {
      value: 'votes'
    },
    {
      value: 'created_at'
    },
    {
      value: 'comment_count'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    const params = {};
    if (topicFiltered !== '' && topicFiltered !== 'all') {
      params.topic = topicFiltered;
    }
    if (sorting !== '' && sorting !== 'all') {
      params.sort_by = sorting;
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
  }, [topicFiltered, sorting]);

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
      <ParamDropdown values={topics} selection={topicFiltered} setSelection={setTopicFiltered} />

      <ParamDropdown values={sortingValues} selection={sorting} setSelection={setSorting} />
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
