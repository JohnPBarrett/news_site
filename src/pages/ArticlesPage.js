import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParamDropdown from '../components/articles/ParamDropdown';
import ArticleRow from '../components/articles/ArticleRow';
import { getArticles, getTopics } from '../utils/api';
import LoaderSpinner from '../utils/LoadingSpinner';
import './ArticlesPage.css';
import randomKey from '../utils/randomKeyGenerator';
import UserContext from '../context/UserContext';
import PageButton from '../components/utils/PageButton';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topicFiltered, setTopicFiltered] = useState('');
  const [sorting, setSorting] = useState('');
  const [topics, setTopics] = useState([]);
  const [pageButtonsLength, setPageButtonsLength] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);

  const sortingValues = [
    {
      name: 'most recent articles',
      value: 'most-recent-articles'
    },
    {
      name: 'oldest articles',
      value: 'oldest-articles'
    },
    {
      name: 'most votes',
      value: 'most-votes'
    },
    {
      name: 'least votes',
      value: 'least-votes'
    },
    {
      name: 'most comments',
      value: 'most-comments'
    },
    {
      name: 'least comments',
      value: 'least-comments'
    }
  ];

  const sortingMap = {
    'most-recent-articles': {
      sort_by: 'created_at',
      order: 'desc'
    },
    'oldest-articles': {
      sort_by: 'created_at',
      order: 'asc'
    },
    'most-votes': {
      sort_by: 'votes',
      order: 'desc'
    },
    'least-votes': {
      sort_by: 'votes',
      order: 'asc'
    },
    'most-comments': {
      sort_by: 'comment_count',
      order: 'desc'
    },
    'least-comments': {
      sort_by: 'comment_count',
      order: 'asc'
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError('');

    const params = {};
    if (topicFiltered !== '' && topicFiltered !== 'all') {
      params.topic = topicFiltered;
    }
    if (sorting !== '' && sorting !== 'all') {
      const sortingParams = sortingMap[sorting];
      params.sort_by = sortingParams.sort_by;
      params.order = sortingParams.order;
    }
    params.p = currentPage;
    getArticles(params)
      .then((data) => {
        setArticles(data.articles);
        if (data.articles.length === 0) setPageButtonsLength(1);
        else {
          setPageButtonsLength(Math.ceil(data.articles[0].total_count / 10));
        }
      })
      .catch(() => {
        setError('Error occured whilst fetching articles');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topicFiltered, sorting, currentPage]);

  useEffect(() => {
    getTopics().then((data) => {
      const topicValues = [
        {
          name: 'show all',
          value: 'all'
        }
      ];

      data.topics.forEach((topic) =>
        topicValues.push({
          name: topic.slug,
          value: topic.slug
        })
      );

      setTopics(topicValues);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [topicFiltered]);

  return (
    <>
      <div className="article-page__filters-container">
        <div className="article-page__filter">
          {error && <h2>{error}</h2>}
          <p>Filter topic</p>
          <ParamDropdown
            values={topics}
            selection={topicFiltered}
            setSelection={setTopicFiltered}
          />
        </div>
        <div className="article-page__filter">
          <p>Sort by:</p>
          <ParamDropdown values={sortingValues} selection={sorting} setSelection={setSorting} />
        </div>
      </div>

      <div className="article-page__create-article-link-container">
        {user === 'guest' ? (
          <>
            <Link to="/login">Login</Link>&nbsp;or&nbsp;<Link to="/signup">Signup</Link>
            &nbsp;to&nbsp;post&nbsp;an&nbsp;article
          </>
        ) : (
          <Link to="/articles/new">Post new article</Link>
        )}
      </div>

      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <main className="content">
          {articles.map((article) => (
            <ArticleRow article={article} key={`${article.article_title}_${randomKey()}`} />
          ))}
          <PageButton
            pageButtonsLength={pageButtonsLength}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      )}
    </>
  );
}

export default ArticlesPage;
