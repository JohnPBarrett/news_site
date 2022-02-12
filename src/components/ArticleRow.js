import { convertDate } from "../utils/convertDate.js";
import { Link } from "react-router-dom";
import Votes from "../components/Votes";

const ArticleRow = (props) => {
  let { article } = props;

  return (
    <article className="article" key={`${article.title}-${article.article_id}`}>
      <div className="article__details">
        <p className="article__topic">Topic: {article.topic}</p>
        <p className="article__author">Posted by {article.author}</p>
        <p className="article__created">{convertDate(article.created_at)}</p>
      </div>
      <Link
        to={
          props.isHome
            ? `./articles/${article.article_id}`
            : `./${article.article_id}`
        }
        className="article__title"
      >
        {article.title}
      </Link>
      <div className="article__user-feedback">
        <Votes
          id={article.article_id}
          votes={article.votes}
          voteType="article"
        />
        <div className="article__comments">
          {article.comment_count} comments
        </div>
      </div>
    </article>
  );
};

export default ArticleRow;
