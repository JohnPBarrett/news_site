import React, { useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import ParamDropdown from '../components/articles/ParamDropdown';
import './CreateArticlePage.css';

export default function CreateArticlePage() {
  const [topics, setTopics] = useState([]);
  const [topicBody, setTopicBody] = useState('');
  const [title, setTitle] = useState('');

  const [articleTopic, setArticleTopic] = useState('');

  const handleChange = (event, setFunc) => {
    setFunc(event.target.value);
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
        <form className="form">
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
            <ParamDropdown
              values={topics}
              selection={articleTopic}
              setSelection={setArticleTopic}
            />
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
            <button type="submit" id="submit" className="form__group-button">
              Post new article
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
