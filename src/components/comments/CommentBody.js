import React, { useState } from 'react';

export default function CommentBody(props) {
  const { commentBody, editMode, commentId } = props;
  const [editTextValue, setEditTextValue] = useState(commentBody);

  const handleChange = (event) => {
    setEditTextValue(event.currentTarget.value);
  };

  const editCommentComponent = (
    <form>
      <textarea className="form__text-area" value={editTextValue} onChange={handleChange} />
    </form>
  );

  return (
    <div className="comment__body">
      {editMode.commentId === commentId ? editCommentComponent : commentBody}
    </div>
  );
}
