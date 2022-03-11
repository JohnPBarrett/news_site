import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { patchArticleBody } from '../../utils/api';

export default function ArticleBody(props) {
  const { articleBody, editMode, setEditMode, articleId, editTextValue, setEditTextValue } = props;

  const [errorMessage, setErrorMessage] = useState('');

  const { user, token } = useContext(UserContext);

  useEffect(() => {}, [editMode, editTextValue]);

  const cancelEditingArticle = () => {
    setEditTextValue(articleBody);
    setEditMode({ articleId: -1, editMode: false });
  };

  const updateArticleBody = async () => {
    setErrorMessage('');
    try {
      const data = {
        username: user,
        body: editTextValue
      };
      await patchArticleBody(articleId, data, token);
    } catch {
      setErrorMessage('Something went wrong updating the article');
    } finally {
      setEditMode({ articleId: -1, editMode: false });
    }
  };

  const handleChange = (event) => setEditTextValue(event.currentTarget.value);

  const updateButton = (
    <button type="button" className="comment__button" onClick={updateArticleBody}>
      update
    </button>
  );

  const cancelButton = (
    <button type="button" className="comment__button" onClick={cancelEditingArticle}>
      cancel
    </button>
  );

  const editCommentComponent = (
    <form>
      <textarea
        className="form__text-area comment__edit-body"
        rows={4}
        value={editTextValue}
        onChange={handleChange}
      />
      {updateButton}
      {cancelButton}
    </form>
  );

  return (
    <div className="article-page__article__body">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {editMode.articleId === articleId ? editCommentComponent : editTextValue}
    </div>
  );
}
