import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./Nav.css";
import NavDropdown from "./NavDropdown";
import NavInputField from "./NavInputField";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Nav = (props) => {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <NavDropdown />
      <NavInputField />
      <Link to="/login">
        <button className="header__user-login btn">user login</button>
      </Link>
      <Link to="/register">
        <button className="header__user-sign-up btn">user sign-up</button>
      </Link>
      <p>Logged in as {user}</p>
    </header>
  );
};

export default Nav;
