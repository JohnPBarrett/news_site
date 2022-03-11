import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getArticle, deleteArticle } from '../../utils/api';
import convertDate from '../../utils/convertDate';
import './Article.css';
import ArticleBody from './ArticleBody';

function Article(props) {
  const [article, setArticle] = useState({});
  const [editMode, setEditMode] = useState({ articleId: -1, editMode: false });
  const componentMounted = useRef(true);
  const { articleId, setError } = props;
  const { setArticleLoaded, setPageButtonsLength } = props;
  const [editTextValue, setEditTextValue] = useState('');

  const { user, token } = useContext(UserContext);

  const navigate = useNavigate();

  const editUserArticle = () => {
    setEditMode({ articleId, editMode: true });
  };

  const editButton = (
    <button type="button" className="article-page__button" onClick={editUserArticle}>
      edit article
    </button>
  );

  const deleteUserArticle = async (event) => {
    setError('');
    const { articleid } = event.currentTarget.dataset;
    try {
      await deleteArticle(articleid, token);
    } catch (err) {
      setError('error in deleting article');
    } finally {
      navigate('/');
    }
  };

  useEffect(() => {
    setError('');
    getArticle(articleId)
      .then((data) => {
        if (componentMounted.current) {
          setArticle(data.article);
          setPageButtonsLength(Math.ceil(data.article.comment_count / 10));
          setEditTextValue(data.article.body);
        }
      })
      .then(() => {
        setArticleLoaded(true);
      })
      .catch(() => {
        setError('article not found');
      });
    return () => {
      componentMounted.current = false;
    };
  }, [articleId, setArticleLoaded]);

  return (
    <article className="article-page__article">
      <div className="article-page__article__details">
        <p className="article-page__article__author">
          Posted by <Link to={`/user/${article.author}`}>{article.author}</Link>
        </p>
        <p>Posted {convertDate(article.created_at)}</p>
      </div>
      <div className="article-page__article__title">
        <p>{article.title}</p>
      </div>
      <ArticleBody
        articleBody={article.body}
        author={article.author}
        editMode={editMode}
        articleId={articleId}
        setEditMode={setEditMode}
        setEditTextValue={setEditTextValue}
        editTextValue={editTextValue}
        setArticleLoaded={setArticleLoaded}
      />

      <div className="article-page__article__info-container">
        <div className="article-page__article__total-comments">
          <p>
            {article.comment_count} comment
            {article.comment_count === 1 ? '' : 's'}
          </p>
        </div>
        {user !== 'guest' && (
          <button
            type="button"
            className="article-page__button"
            onClick={deleteUserArticle}
            data-articleid={`${articleId}`}
          >
            delete article
          </button>
        )}
        {!editMode.editMode && article.author === user && editButton}
      </div>
    </article>
  );
}

export default Article;
