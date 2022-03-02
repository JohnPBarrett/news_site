import { Link } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../../assets/logo.png';
import './Nav.css';
import UserContext from '../../context/UserContext';

function Nav() {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser('guest');
  };

  const registrationButton = (
    <Link to="/register">
      <button type="button" className="header__user-sign-up btn">
        user sign-up
      </button>
    </Link>
  );

  const logoutButton = (
    <span>
      <button type="button" className="header__user-log-out btn" onClick={() => logout()}>
        Sign out
      </button>
    </span>
  );

  const loginButton = (
    <Link to="/login">
      <button type="button" className="header__user-login btn">
        user login
      </button>
    </Link>
  );

  const userAccountButton = (
    <Link to="/">
      <button type="button" className="header__user-login btn">
        user&apos;s page
      </button>
    </Link>
  );

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      {user === 'guest' ? loginButton : userAccountButton}
      {user === 'guest' ? registrationButton : logoutButton}

      <p>Logged in as {user}</p>
    </header>
  );
}

export default Nav;
