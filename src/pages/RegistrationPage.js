import "./RegistrationPage.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RegistrationPage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="content">
      <div className="registration-form__container">
        <form className="registration-form">
          <div className="registration-form__group">
            <label htmlFor="username" className="registration-form__label">
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="registration-form__control"
              required
            ></input>
          </div>
          <div className="registration-form__group">
            <label htmlFor="password" className="registration-form__label">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="registration-form__control"
              required
            ></input>
          </div>
          <div className="registration-form__group">
            <label htmlFor="avatar-url" className="registration-form__label">
              avatar url
            </label>
            <input
              id="avatar-url"
              name="avatar-url"
              type="text"
              className="registration-form__control"
            ></input>
          </div>
          <div className="registration-form__group">
            <button id="registration">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
