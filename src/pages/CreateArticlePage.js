import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { getTopics, postArticle } from '../utils/api';
import ParamDropdown from '../components/articles/ParamDropdown';
import './CreateArticlePage.css';

export default function CreateArticlePage() {
  const [topics, setTopics] = useState([]);
  const [topicBody, setTopicBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const { user, token } = useContext(UserContext);

  const navigate = useNavigate();

  const [articleTopic, setArticleTopic] = useState('');

  const handleChange = (event, setFunc) => {
    setFunc(event.target.value);
  };

  const submitPost = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const data = {
      title,
      body: topicBody,
      topic: articleTopic,
      author: user
    };

    postArticle(data, token)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setError('Failed to create article');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTopics().then((data) => {
      const topicValues = [];

      data.topics.forEach((topic) =>
        topicValues.push({
          name: topic.slug,
          value: topic.slug
        })
      );

      setTopics(topicValues);
    });
  }, []);

  return (
    <main className="content">
      <div className="form__container">
        {error && <div>{error}</div>}
        <form className="form" onSubmit={submitPost}>
          <div className="form__group">
            <label htmlFor="title" className="form__label">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => handleChange(e, setTitle)}
              className="form__control create-article__title"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="topic" className="form__label">
              Topic *
            </label>
            <div style={{ color: '#333' }}>
              <ParamDropdown
                values={topics}
                selection={articleTopic}
                setSelection={setArticleTopic}
              />
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="title" className="form__label">
              body *
            </label>
            <textarea
              type="text"
              className="form__text-area create-article__body"
              placeholder="What are your thoughts?"
              value={topicBody}
              onChange={(e) => handleChange(e, setTopicBody)}
              required
              rows={8}
            >
              {' '}
            </textarea>
          </div>
          <div className="form__group btn__form-right">
            <button disabled={loading} type="submit" id="submit" className="form__group-button">
              Post new article
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
