import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Nav.css";
import { MagnifyingGlassSVG } from "../assets/MagnifyingGlassSVG";
import { getTopics } from "../utils/api";

const Nav = (props) => {
  let [topics, setTopics] = useState([]);
  let [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let [inputValue, setInputValue] = useState("");

  const changeTopic = (event) => {
    let filteredTopic = event.target.value;
    setTopic(filteredTopic);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    try {
      navigate(`/articles?search=${inputValue}`);
      setInputValue("");
    } catch (err) {
      navigate("/articles");
    }
  };

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data.topics);
      })
      .then(() => {
        if (topic === "all") {
          navigate("/articles");
        } else if (topic !== "") {
          navigate(`/articles?topic=${topic}`);
        } else {
          navigate("/");
        }
      });
  }, [topic]);

  useEffect(() => {
    if (location.pathname === "/") {
      setTopic("");
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <nav className="navigation">
        <select
          className="navigation__drop-down"
          // onChange={(e) => changeTopic(e)}
          value={topic}
        >
          <option value="">Home</option>
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
      <form action="#" className="search" onSubmit={(e) => handleSearch(e)}>
        <input
          className="search__input"
          id="search"
          placeholder="Search for articles"
          value={inputValue}
          // onChange={(e) => handleInputChange(e)}
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
