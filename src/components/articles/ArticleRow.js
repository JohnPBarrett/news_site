import { Link } from 'react-router-dom';
import convertDate from '../../utils/convertDate';
import Votes from '../utils/Votes';

function ArticleRow(props) {
  const { article } = props;

  return (
    <article className="article" key={`${article.title}-${article.article_id}`}>
      <div className="article__details">
        <p className="article__topic">Topic: {article.topic}</p>
        <p className="article__author">
          Posted by <Link to={`/user/${article.author}`}> {article.author}</Link>
        </p>
        <p className="article__created">Posted {convertDate(article.created_at)}</p>
      </div>
      <Link to={`/articles/${article.article_id}`} className="article__title">
        {article.title}
      </Link>
      <div className="article__user-feedback">
        <Votes id={article.article_id} currentVotes={article.votes} voteType="article" />
        <div className="article__comments">{article.comment_count} comments</div>
      </div>
    </article>
  );
}

export default ArticleRow;
