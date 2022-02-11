import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";

const NavDropdown = () => {
  let [topic, setTopic] = useState("");
  let [topics, setTopics] = useState([]);
  let [filterActive, setFilterActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data.topics);
    });
  }, []);

  useEffect(() => {
    if (filterActive) {
      setFilterActive(false);
      if (topic === "all") {
        navigate("/articles");
      } else if (topic !== "") {
        navigate(`/articles?topic=${topic}`);
      } else if (topic === "") {
        navigate("/");
      }
    }
  }, [topic, filterActive]);

  const changeTopic = (event) => {
    let filteredTopic = event.target.value;
    setTopic(filteredTopic);
    setFilterActive(true);
  };

  return (
    <nav className="navigation">
      <select
        className="navigation__drop-down"
        onChange={(e) => changeTopic(e)}
        value={topic}
      >
        <option value="" disabled>
          Select from below
        </option>
        <option value="all">Show all</option>
        {topics.map((topic, idx) => {
          return (
            <option value={topic.slug} key={`${topic} ${idx}`}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    </nav>
  );
};

export default NavDropdown;
