import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassSVG } from "../assets/MagnifyingGlassSVG";

const NavInputField = () => {
  let [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    try {
      navigate(`/articles?search=${inputValue}`);
      setInputValue("");
    } catch (err) {
      setInputValue("");
      navigate("/articles");
    }
  };

  return (
    <form action="#" className="search" onSubmit={(e) => handleSearch(e)}>
      <input
        className="search__input"
        id="search"
        placeholder="Search for articles"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
      />
      <button className="search__button">
        <MagnifyingGlassSVG className="search__icon" />
      </button>
    </form>
  );
};

export default NavInputField;
