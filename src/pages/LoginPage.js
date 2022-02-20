import "./LoginPage.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="content">
      <div className="login-form__container">
        <form className="login-form">
          <div className="login-form__group">
            <label htmlFor="username" className="login-form__label">
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="login-form__control"
              required
            ></input>
          </div>
          <div className="login-form__group">
            <label htmlFor="password" className="login-form__label">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="login-form__control"
              required
            ></input>
          </div>
          <div className="login-form__group">
            <label htmlFor="avatar-url" className="login-form__label">
              avatar url
            </label>
            <input
              id="avatar-url"
              name="avatar-url"
              type="text"
              className="login-form__control"
            ></input>
          </div>
          <div className="login-form__group">
            <button id="login">login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
