import { useState, useEffect, useRef, useContext } from 'react';
import { getArticleComments } from '../../utils/api';
import UserContext from '../../context/UserContext';
import Comment from './Comment';
import CommentPosting from './CommentPosting';
import './CommentsContainer.css';
import ParamDropdown from '../articles/ParamDropdown';
import PageButton from '../utils/PageButton';

function CommentsContainer(props) {
  const { user } = useContext(UserContext);
  const { articleId, setCommentsLoaded, pageButtonsLength } = props;
  const componentMounted = useRef(true);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(true);
  const [sorting, setsorting] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const sortingValues = [
    {
      name: 'votes',
      value: 'votes'
    },
    {
      name: 'created at',
      value: 'created_at'
    }
  ];

  useEffect(() => {
    setError('');
    // Checking that the component is mounted gets rid of memory leaks
    componentMounted.current = true;

    const params = {};
    if (sorting !== '' && sorting !== 'all') {
      params.sort_by = sorting;
    }
    params.p = currentPage;

    getArticleComments(articleId, params)
      .then((data) => {
        if (componentMounted.current) {
          setComments(data.comments);
        }
      })
      .then(() => {
        setCommentsLoaded(true);
        setNewComment(true);
      })
      .catch(() => {
        setError('Error occured whilst fetching comments');
      });
    return () => {
      componentMounted.current = false;
    };
  }, [articleId, setCommentsLoaded, newComment, sorting, currentPage]);

  // This useEffect is to repopulate the page once a comment has been deleted
  useEffect(() => {
    setError('');
    componentMounted.current = true;

    const params = {};
    if (sorting !== '' && sorting !== 'all') {
      params.sort_by = sorting;
    }
    params.p = currentPage;

    getArticleComments(articleId, params)
      .then((data) => {
        if (componentMounted.current) {
          setComments(data.comments);
        }
      })
      .then(() => {
        setCommentsLoaded(true);
        setCommentDeleted(false);
      })
      .catch(() => {
        setError('Error occured whilst deleting comment');
      });
    return () => {
      componentMounted.current = false;
    };
  }, [commentDeleted]);

  const userNotLoggedIn = (
    <div className="comment__not-logged-in">
      <div>Login or Signup to leave a comment</div>
    </div>
  );

  return (
    <>
      {' '}
      <div className="comment__container">
        {error && <h2>{error}</h2>}
        {user === 'guest' ? (
          userNotLoggedIn
        ) : (
          <CommentPosting articleId={articleId} comments={comments} setNewComment={setNewComment} />
        )}
        <div className="article-page__dropdowns">
          <p>Sort by:</p>
          <ParamDropdown values={sortingValues} selection={sorting} setSelection={setsorting} />
        </div>
        {newComment && <Comment comments={comments} setCommentDeleted={setCommentDeleted} />}
        <PageButton
          pageButtonsLength={pageButtonsLength}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default CommentsContainer;
