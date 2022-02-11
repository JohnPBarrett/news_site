import "./IndividualArticlePage.css";
import { useParams } from "react-router-dom";
import Article from "../components/Article";
import CommentsContainer from "../components/CommentsContainer";

const IndividualArticlePage = () => {
  let { id } = useParams();

  return (
    <main className="content">
      <div className="article-page__container">
        <Article articleId={id} />
      </div>
      <div className="article-page__comments">
        <CommentsContainer articleId={id} />
      </div>
    </main>
  );
};

export default IndividualArticlePage;
