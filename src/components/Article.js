import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getArticle } from "../utils/api";

const Article = (props) => {
  let [article, setArticle] = useState({});
  let [comments, setComments] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    setArticle([]);
    getArticle(id).then((data) => {
      setArticle(data.article);
      console.log(data);
    });
  }, [id]);

  return (
    <div className="content">
      <main>
        <p>{article.author}</p>
        <p>{article.body}</p>
        <p>{article.comment_count}</p>
        <p>{article.created_at}</p>
        <p>{article.title}</p>
      </main>
    </div>
  );
};

export default Article;
