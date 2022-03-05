import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../utils/api';
import LoaderSpinner from '../utils/LoadingSpinner';
import ArticleRow from '../components/articles/ArticleRow';
import randomKey from '../utils/randomKeyGenerator';

import './UserPage.css';

function UserPage() {
  const { username } = useParams();
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('articles');

  const handleClick = (event) => {
    setFilter('');
    // to stop articles popping in
    setUserArticles([]);
    const { value } = event.currentTarget;
    setFilter(value);
  };

  useEffect(() => {
    setLoading(true);

    switch (filter) {
      case 'articles':
        getArticles().then(({ articles }) => {
          const filteredArticles = articles.filter((article) => article.author === username);
          setUserArticles(filteredArticles);
          setLoading(false);
        });
        break;
      case 'comments':
        setLoading(false);
        break;
      default:
        break;
    }
  }, [filter]);

  return (
    <div className="content">
      <main>
        <p className="userpage__user-heading">{username}&apos;s page</p>
        <div>
          <ul className="userpage__filter-nav">
            <li className="userpage__filter-element">
              <button className="btn" value="articles" type="button" onClick={handleClick}>
                articles
              </button>
            </li>
            <li className="userpage__filter-element">
              <button className="btn" value="comments" type="button" onClick={handleClick}>
                comments
              </button>
            </li>
          </ul>
        </div>
        {(() => {
          if (loading) return <LoaderSpinner />;
          switch (filter) {
            case 'articles':
              return userArticles.map((article) => (
                <ArticleRow article={article} key={`${article.article_title}_${randomKey()}`} />
              ));
            case 'comments':
              return <p>Comment tests</p>;
            default:
              return <p>Something went wrong</p>;
          }
        })()}
      </main>
    </div>
  );
}

export default UserPage;
