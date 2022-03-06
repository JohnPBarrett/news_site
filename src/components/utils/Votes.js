import { useContext, useState } from 'react';
import { UpArrowSVG, DownArrowSVG } from '../../assets/ArrowsSVG';
import UserContext from '../../context/UserContext';
import { patchArticleVotes, patchCommentVotes } from '../../utils/api';
import './Votes.css';

function Votes(props) {
  const { id } = props;
  const { voteType } = props;
  const { currentVotes } = props;
  const [votes, setVotes] = useState(currentVotes);
  const errorCommentsMessage = 'error updating comments';
  const { user } = useContext(UserContext);

  const increaseVote = (targetId, voteChangeValue, voteChangeType, voteAmount) => {
    setVotes((current) => current + voteAmount);

    switch (voteChangeType) {
      case 'article':
        patchArticleVotes(targetId, voteChangeValue, voteAmount).catch(() => {
          setVotes((current) => current - voteAmount);
          return errorCommentsMessage;
        });
        break;
      case 'comment':
        patchCommentVotes(targetId, voteChangeValue, voteAmount).catch(() => {
          setVotes((current) => current - voteAmount);
          return errorCommentsMessage;
        });
        break;

      default:
        break;
    }
  };

  const decreaseVote = (targetId, voteChangeValue, voteChangeType, voteAmount) => {
    setVotes((current) => current - voteAmount);

    switch (voteChangeType) {
      case 'article':
        patchArticleVotes(targetId, voteChangeValue, voteAmount).catch(() => {
          setVotes((current) => current + voteAmount);
          return errorCommentsMessage;
        });
        break;
      case 'comment':
        patchCommentVotes(targetId, voteChangeValue, voteAmount).catch(() => {
          setVotes((current) => current + voteAmount);
          return errorCommentsMessage;
        });

        break;
      default:
        break;
    }
  };

  const voteChange = (event, voteChangeValue, voteChangeType) => {
    // don't do anything if user isn't logged in
    if (user === 'guest') return;

    const target = event.currentTarget;
    const { targetid } = target.dataset;
    // event.currentTarget.classList.toggle('active');

    const votesContainer = target.parentNode;
    let upVoteButton;
    let downVoteButton;
    votesContainer.childNodes.forEach((node) => {
      if (node.classList.contains('arrow-button__up')) {
        upVoteButton = node;
      } else if (node.classList.contains('arrow-button__down')) {
        downVoteButton = node;
      }
    });

    if (votesContainer.classList.contains('voted_on')) {
      // to handle case where clicking on vote that user has already voted on
      if (voteChangeValue === 'inc') {
        if (upVoteButton.classList.contains('active')) {
          upVoteButton.classList.toggle('active');
          decreaseVote(targetid, 'dec', voteChangeType, 1);
          votesContainer.classList.toggle('voted_on');
        } else {
          downVoteButton.classList.toggle('active');
          upVoteButton.classList.toggle('active');
          increaseVote(targetid, voteChangeValue, voteChangeType, 2);
        }
      } else if (downVoteButton.classList.contains('active')) {
        downVoteButton.classList.toggle('active');
        increaseVote(targetid, 'inc', voteChangeType, 1);
        votesContainer.classList.toggle('voted_on');
      } else {
        downVoteButton.classList.toggle('active');
        upVoteButton.classList.toggle('active');
        decreaseVote(targetid, voteChangeValue, voteChangeType, 2);
      }
    } else {
      votesContainer.classList.toggle('voted_on');
      if (voteChangeValue === 'inc') {
        upVoteButton.classList.toggle('active');
        increaseVote(targetid, voteChangeValue, voteChangeType, 1);
      } else {
        downVoteButton.classList.toggle('active');
        decreaseVote(targetid, voteChangeValue, voteChangeType, 1);
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
