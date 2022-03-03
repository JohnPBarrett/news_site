import { useState, useEffect } from 'react';
import { getTopics } from '../../utils/api';
import randomKey from '../../utils/randomKeyGenerator';

function ArticleTopicDropdown(props) {
  const [topics, setTopics] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const { setDropDown, topic, setTopic } = props;

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data.topics);
    });
  }, []);

  useEffect(() => {
    if (filterActive) {
      setFilterActive(false);
      if (topic === '') {
        setDropDown('');
      } else if (topic !== '') {
        setDropDown(topic);
      }
    }
  }, [topic, filterActive]);

  const changeTopic = (event) => {
    const filteredTopic = event.target.value;
    setTopic(filteredTopic);
    setFilterActive(true);
  };

  return (
    <nav className="navigation">
      <select className="navigation__drop-down" onChange={(e) => changeTopic(e)} value={topic}>
        <option value="" disabled>
          Select from below
        </option>
        <option value="all">Show all</option>
        {topics.map((currentTopic) => (
          <option value={currentTopic.slug} key={`${currentTopic}_${randomKey()}`}>
            {currentTopic.slug}
          </option>
        ))}
      </select>
    </nav>
  );
}

export default ArticleTopicDropdown;
