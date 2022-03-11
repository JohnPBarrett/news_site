import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Article from '../components/articles/Article';
import CommentsContainer from '../components/comments/CommentsContainer';
import LoaderSpinner from '../utils/LoadingSpinner';
import NotFound from '../components/utils/NotFound';

function IndividualArticlePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [pageButtonsLength, setPageButtonsLength] = useState(1);

  const [error, setError] = useState('');

  useEffect(() => {
    if (articleLoaded && commentsLoaded) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [articleLoaded, commentsLoaded]);

  if (error) {
    return <NotFound />;
  }

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <main className="content">
      <div className="article-page__container">
        <Article
          setError={setError}
          articleId={id}
          setArticleLoaded={setArticleLoaded}
          setPageButtonsLength={setPageButtonsLength}
        />
      </div>
      <div className="article-page__comments">
        <CommentsContainer
          articleId={id}
          setCommentsLoaded={setCommentsLoaded}
          pageButtonsLength={pageButtonsLength}
        />
      </div>
    </main>
  );
}

export default IndividualArticlePage;
