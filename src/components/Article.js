import { useState, useEffect, useRef } from 'react';
import { getArticle } from '../utils/api';
import convertDate from '../utils/convertDate';
import './Article.css';

function Article(props) {
  const [article, setArticle] = useState({});
  const componentMounted = useRef(true);
  const { articleId } = props;
  const { setArticleLoaded } = props;

  useEffect(() => {
    getArticle(articleId)
      .then((data) => {
        if (componentMounted.current) {
          setArticle(data.article);
        }
      })
      .then(() => {
        setArticleLoaded(true);
      });
    return () => {
      componentMounted.current = false;
    };
  }, [articleId, setArticleLoaded]);

  return (
    <article className="article-page__article">
      <div className="article-page__article__details">
        <p className="article-page__article__author">Posted by {article.author}</p>
        <p>{convertDate(article.created_at)}</p>
      </div>
      <div className="article-page__article__title">
        <p>{article.title}</p>
      </div>
      <div className="article-page__article__body">
        <p>{article.body}</p>
      </div>

      <div className="article-page__article__total-comments">
        <p>
          {article.comment_count} comment
          {article.comment_count === 1 ? '' : 's'}
        </p>
      </div>
    </article>
  );
}

export default Article;
