import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Nav.css";
import { MagnifyingGlassSVG } from "../assets/MagnifyingGlassSVG";
import { getTopics } from "../utils/api";

const Nav = () => {
  let [topics, setTopics] = useState([]);
  let [topic, setTopic] = useState("");
  let navigate = useNavigate();

  const changeTopic = (event) => {
    let filteredTopic = event.target.value;
    setTopic(filteredTopic);

    navigate(`/articles?topic=${filteredTopic}`);
  };

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data.topics);
    });
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <nav className="navigation">
        <select
          className="navigation__drop-down"
          onChange={(e) => changeTopic(e)}
          value={topic}
        >
          <option value="">All</option>
          {topics.map((topic, idx) => {
            return (
              <option value={topic.slug} key={`${topic} ${idx}`}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </nav>
      <form action="#" className="search">
        <input
          className="search__input"
          id="search"
          placeholder="Search for articles"
        />
        <button className="search__button">
          <MagnifyingGlassSVG className="search__icon" />
        </button>
      </form>
      <button className="header__user-login btn">user login</button>
      <button className="header__user-sign-up btn">user sign-up</button>
    </header>
  );
};

export default Nav;
