import logo from "../assets/logo.png";
import "./Nav.css";
import { MagnifyingGlassSVG } from "../assets/MagnifyingGlassSVG";

const Nav = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <nav className="navigation">
        <select className="navigation__drop-down">
          <option value="">Choose topic</option>
          <option value="test">Some testing</option>
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
