import { UpArrowSVG, DownArrowSVG } from "../assets/ArrowsSVG";
import { useState } from "react";
import { patchArticleVotes } from "../utils/api";

const Votes = (props) => {
  const linkId = props.id;
  const [votes, setVotes] = useState(props.votes);

  const voteIncrease = (event) => {
    const { article_id } = event.currentTarget.dataset;
    setVotes((current) => current + 1);
    patchArticleVotes(article_id, "inc").catch((err) => {
      setVotes((current) => current - 1);
    });
  };

  const voteDecrease = (event) => {
    const { article_id } = event.currentTarget.dataset;
    setVotes((current) => current - 1);
    patchArticleVotes(article_id, "dec").catch((err) => {
      setVotes((current) => current + 1);
    });
  };

  return (
    <div className="votes__container">
      <button
        className="arrow-button arrow-button__up"
        data-article_id={linkId}
        onClick={(e) => voteIncrease(e)}
      >
        <UpArrowSVG className="arrow-icon up-arrow" />
      </button>
      <div className="votes-count">{votes} votes</div>
      <button
        className="arrow-button arrow-button__down"
        data-article_id={linkId}
        onClick={(e) => voteDecrease(e)}
      >
        <DownArrowSVG className="arrow-icon down-arrow" />
      </button>
    </div>
  );
};

export default Votes;
