// import { getArticles, patchArticleVotes } from "../utils/api";
// import { useState, useEffect } from "react";
// import { UpArrowSVG, DownArrowSVG } from "../assets/ArrowsSVG";
// import { Link, useLocation } from "react-router-dom";
// import { convertDate } from "../utils/convertDate.js";
// import NotFound from "./NotFound";

// import "./Articles.css";

// const Articles = (props) => {
//   let [articles, setArticles] = useState([]);
//   const location = useLocation();
//   let isHome = props.isHome || false;
//   let [error, setError] = useState(null);

//   useEffect(() => {
//     if (isHome) {
//       getHomeArticles().then(({ articles }) => {
//         setArticles([...articles]);
//       });
//     } else {
//       getArticles(location.search)
//         .then(({ articles }) => {
//           setError(null);
//           setArticles([...articles]);
//         })
//         .catch((err) => {
//           setError({ err });
//         });
//     }
//   }, [location, isHome]);

//   const getHomeArticles = async () => {
//     const homeArticles = await getArticles("?limit=4&sort_by=created_at");
//     return homeArticles;
//   };

//   const changeVotes = async (e, voteChangeType) => {
//     const { article_id } = e.currentTarget.dataset;
//     await patchArticleVotes(article_id, voteChangeType);
//   };

//   if (error) {
//     return (
//       <div>
//         <NotFound />
//       </div>
//     );
//   }

//   return (
//     <>
//       {articles.map((article) => {
//         return (
//           <article
//             className="article"
//             key={`${article.title}-${article.article_id}`}
//           >
//             <div className="article__details">
//               <p className="article__topic">Topic: {article.topic}</p>
//               <p className="article__author">Posted by {article.author}</p>
//               <p className="article__created">
//                 {convertDate(article.created_at)}
//               </p>
//             </div>
//             <Link
//               to={
//                 isHome
//                   ? `./articles/${article.article_id}`
//                   : `./${article.article_id}`
//               }
//               className="article__title"
//             >
//               {article.title}
//             </Link>
//             <div className="article__user-feedback">
//               <div className="votes__container">
//                 <button
//                   className="arrow-button arrow-button__up"
//                   onClick={(e) => changeVotes(e, "inc")}
//                   data-article_id={article.article_id}
//                 >
//                   <UpArrowSVG className="arrow-icon up-arrow" />
//                 </button>
//                 <div className="votes-count">{article.votes} votes</div>
//                 <button
//                   className="arrow-button arrow-button__down"
//                   data-article_id={article.article_id}
//                 >
//                   <DownArrowSVG className="arrow-icon down-arrow" />
//                 </button>
//               </div>
//               <div className="article__comments">
//                 {article.comment_count} comments
//               </div>
//             </div>
//           </article>
//         );
//       })}
//     </>
//   );
// };

// export default Articles;
