import ArticleRow from './ArticleRow';

import './Articles.css';

function ArticlesContainer(props) {
  const { articles } = props;
  return (
    <>
      {articles.map((article) => (
        <ArticleRow article={article} key={`${article.article_title}_${article.article_id}`} />
      ))}
    </>
  );
}

export default ArticlesContainer;
