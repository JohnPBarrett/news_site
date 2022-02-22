import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./Nav.css";
import NavDropdown from "./NavDropdown";
import NavInputField from "./NavInputField";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Nav = (props) => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser("guest");
  };

  const registrationButton = (
    <Link to="/register">
      <button className="header__user-sign-up btn">user sign-up</button>
    </Link>
  );

  const logoutButton = (
    <span>
      <button className="header__user-log-out btn" onClick={() => logout()}>
        Sign out
      </button>
    </span>
  );

  const loginButton = (
    <Link to="/login">
      <button className="header__user-login btn">user login</button>
    </Link>
  );

  const userAccountButton = (
    <Link to="/">
      <button className="header__user-login btn">user's page</button>
    </Link>
  );

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <NavDropdown />
      <NavInputField />

      {user === "guest" ? loginButton : userAccountButton}
      {user === "guest" ? registrationButton : logoutButton}

      <p>Logged in as {user}</p>
    </header>
  );
};

export default Nav;
