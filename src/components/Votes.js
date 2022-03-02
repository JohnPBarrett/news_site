import { useState } from 'react';
import { UpArrowSVG, DownArrowSVG } from '../assets/ArrowsSVG';
import { patchArticleVotes, patchCommentVotes } from '../utils/api';

function Votes(props) {
  const linkId = props.id;
  const [votes, setVotes] = useState(props.votes);

  const voteChange = (event, voteChangeValue, voteChangeType) => {
    const { id } = event.currentTarget.dataset;
    if (voteChangeValue === 'inc') {
      setVotes((current) => current + 1);

      switch (voteChangeType) {
        case 'article':
          patchArticleVotes(id, voteChangeValue).catch((err) => {
            setVotes((current) => current - 1);
          });
          break;
        case 'comment':
          patchCommentVotes(id, voteChangeValue).catch((err) => {
            setVotes((current) => current - 1);
          });
          break;

        default:
          break;
      }
    } else {
      setVotes((current) => current - 1);

      switch (voteChangeType) {
        case 'article':
          patchArticleVotes(id, voteChangeValue).catch((err) => {
            setVotes((current) => current + 1);
          });
          break;
        case 'comment':
          patchCommentVotes(id, voteChangeValue).catch((err) => {
            setVotes((current) => current + 1);
          });

          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="votes__container">
      <button
        className="arrow-button arrow-button__up"
        data-id={linkId}
        onClick={(e) => voteChange(e, 'inc', props.voteType)}
      >
        <UpArrowSVG className="arrow-icon up-arrow" />
      </button>
      <div className="votes-count">{votes} votes</div>
      <button
        className="arrow-button arrow-button__down"
        data-id={linkId}
        onClick={(e) => voteChange(e, 'dec', props.voteType)}
      >
        <DownArrowSVG className="arrow-icon down-arrow" />
      </button>
    </div>
  );
}

export default Votes;
