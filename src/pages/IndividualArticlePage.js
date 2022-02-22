import "./IndividualArticlePage.css";
import { useParams } from "react-router-dom";
import Article from "../components/Article";
import CommentsContainer from "../components/CommentsContainer";
import LoaderSpinner from "../utils/LoadingSpinner";
import { useEffect, useState } from "react";

const IndividualArticlePage = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  // useEffect(() => {
  //   if (articleLoaded && commentsLoaded) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [articleLoaded, commentsLoaded]);

  return (
    <main className="content">
      <div className="article-page__container">
        <Article articleId={id} setArticleLoaded={setArticleLoaded} />
      </div>
      <div className="article-page__comments">
        <CommentsContainer
          articleId={id}
          setCommentsLoaded={setCommentsLoaded}
        />
      </div>
    </main>
  );
};

export default IndividualArticlePage;
