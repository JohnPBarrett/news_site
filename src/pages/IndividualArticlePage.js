import './IndividualArticlePage.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Article from '../components/articles/Article';
import CommentsContainer from '../components/comments/CommentsContainer';
import LoaderSpinner from '../utils/LoadingSpinner';

function IndividualArticlePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    if (articleLoaded && commentsLoaded) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [articleLoaded, commentsLoaded]);

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <main className="content">
      <div className="article-page__container">
        <Article articleId={id} setArticleLoaded={setArticleLoaded} />
      </div>
      <div className="article-page__comments">
        <CommentsContainer articleId={id} setCommentsLoaded={setCommentsLoaded} />
      </div>
    </main>
  );
}

export default IndividualArticlePage;
