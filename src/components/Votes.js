import { useState } from 'react';
import { UpArrowSVG, DownArrowSVG } from '../assets/ArrowsSVG';
import { patchArticleVotes, patchCommentVotes } from '../utils/api';

function Votes(props) {
  const { id } = props;
  const { voteType } = props;
  const { currentVotes } = props;
  const [votes, setVotes] = useState(currentVotes);

  const voteChange = (event, voteChangeValue, voteChangeType) => {
    const { targetid } = event.currentTarget.dataset;
    if (voteChangeValue === 'inc') {
      setVotes((current) => current + 1);

      switch (voteChangeType) {
        case 'article':
          patchArticleVotes(targetid, voteChangeValue).catch(() => {
            setVotes((current) => current - 1);
          });
          break;
        case 'comment':
          patchCommentVotes(targetid, voteChangeValue).catch(() => {
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
          patchArticleVotes(targetid, voteChangeValue).catch(() => {
            setVotes((current) => current + 1);
          });
          break;
        case 'comment':
          patchCommentVotes(targetid, voteChangeValue).catch(() => {
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
        type="button"
        className="arrow-button arrow-button__up"
        data-targetid={id}
        onClick={(e) => voteChange(e, 'inc', voteType)}
      >
        <UpArrowSVG className="arrow-icon up-arrow" />
      </button>
      <div className="votes-count">{votes} votes</div>
      <button
        type="button"
        className="arrow-button arrow-button__down"
        data-targetid={id}
        onClick={(e) => voteChange(e, 'dec', voteType)}
      >
        <DownArrowSVG className="arrow-icon down-arrow" />
      </button>
    </div>
  );
}

export default Votes;
