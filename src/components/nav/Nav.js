import { Link } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../../assets/logo.png';
import './Nav.css';
import UserContext from '../../context/UserContext';

function Nav() {
  const { user, setUser, avatar } = useContext(UserContext);

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
    <Link to={`/user/${user}`}>
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
      <Link to="/articles">
        <p className="header__articles-link">articles</p>
      </Link>
      {user === 'guest' ? loginButton : userAccountButton}
      {user === 'guest' ? registrationButton : logoutButton}

      <p className="header__current-user">
        {avatar && <img src={avatar} alt="user__avatar" className="header__user-avatar" />}Logged in
        as&nbsp;
        {user}
      </p>
    </header>
  );
}

export default Nav;
