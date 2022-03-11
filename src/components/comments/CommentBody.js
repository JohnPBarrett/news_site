import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { patchCommentBody } from '../../utils/api';

export default function CommentBody(props) {
  const { commentBody, editMode, setEditMode, commentId, setCommentUpdate } = props;
  const [editTextValue, setEditTextValue] = useState(commentBody);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, token } = useContext(UserContext);

  // useEffect(() => {}, [editMode]);

  const handleChange = (event) => {
    setEditTextValue(event.currentTarget.value);
  };

  const updateComment = async () => {
    try {
      const data = {
        username: user,
        body: editTextValue
      };
      await patchCommentBody(commentId, data, token);
      setCommentUpdate(true);
    } catch (err) {
      setErrorMessage('error in updating comment');
    } finally {
      setEditMode({ commentId: -1, editMode: false });
    }
  };

  const cancelEditingComment = () => {
    setEditMode({ commentId: -1, editMode: false });
  };

  const updateButton = (
    <button type="button" className="comment__button" onClick={updateComment}>
      update
    </button>
  );

  const cancelButton = (
    <button type="button" className="comment__button" onClick={cancelEditingComment}>
      cancel
    </button>
  );

  const editCommentComponent = (
    <form>
      <textarea
        className="form__text-area comment__edit-body"
        value={editTextValue}
        onChange={handleChange}
        rows={4}
      />
      {updateButton}
      {cancelButton}
    </form>
  );

  return (
    <div className="comment__body">
      {errorMessage && <p>{errorMessage}</p>}
      {editMode.commentId === commentId ? editCommentComponent : editTextValue}
    </div>
  );
}
