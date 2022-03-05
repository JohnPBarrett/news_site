import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles, getComments } from '../utils/api';
import LoaderSpinner from '../utils/LoadingSpinner';
import ArticleRow from '../components/articles/ArticleRow';
import Comment from '../components/comments/Comment';
import randomKey from '../utils/randomKeyGenerator';

import './UserPage.css';

function UserPage() {
  const { username } = useParams();
  const [userArticles, setUserArticles] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('articles');

  const handleClick = (event) => {
    setFilter('');
    // to stop articles popping in
    setUserArticles([]);
    setUserComments([]);
    const { value } = event.currentTarget;
    setFilter(value);
    setLoading(true);
  };

  useEffect(() => {
    switch (filter) {
      case 'articles':
        getArticles().then(({ articles }) => {
          const filteredArticles = articles.filter((article) => article.author === username);
          setUserArticles(filteredArticles);

          setLoading(false);
        });
        break;
      case 'comments':
        getComments().then(({ comments }) => {
          const filteredComments = comments.filter((comment) => comment.author === username);
          setUserComments(filteredComments);
          setLoading(false);
        });
        break;
      default:
        break;
    }
  }, [loading, username]);

  return (
    <main className="content userpage__content--flex-column">
      <div>
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
      </div>
      {(() => {
        if (loading)
          return (
            <div>
              <LoaderSpinner />
            </div>
          );
        switch (filter) {
          case 'articles':
            return userArticles.map((article) => (
              <ArticleRow article={article} key={`${article.article_title}_${randomKey()}`} />
            ));
          case 'comments':
            return (
              <div className="comment__container">
                <Comment comments={userComments} />
              </div>
            );
          default:
            return <p>Something went wrong</p>;
        }
      })()}
    </main>
  );
}

export default UserPage;
