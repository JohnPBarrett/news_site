import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./Nav.css";
import NavDropdown from "./NavDropdown";
import NavInputField from "./NavInputField";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Nav = (props) => {
  const { user, setUser } = useContext(UserContext);

  const logout = (e) => {
    setUser("guest");
  };

  const registrationButton = (
    <Link to="/register">
      <button className="header__user-sign-up btn">user sign-up</button>
    </Link>
  );

  const logoutButton = (
    <span>
      <button className="header__user-log-out btn" onClick={(e) => logout(e)}>
        Sign out
      </button>
    </span>
  );

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

      {user === "guest" ? registrationButton : logoutButton}

      <p>Logged in as {user}</p>
    </header>
  );
};

export default Nav;
