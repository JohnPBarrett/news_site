import "./RegistrationPage.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { registeruser } from "../utils/api";

const RegistrationPage = () => {
  const { setUser } = useContext(UserContext);

  const signUp = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      name: event.target.name.value,
      avatar_url: event.target.avatar_url.value
    };

    console.log(data);

    try {
      const response = await registeruser(data);
      console.log(response);
      setUser(data.username);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content">
      <div className="registration-form__container">
        <form
          className="registration-form"
          action="post"
          onSubmit={(e) => signUp(e)}
        >
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
            <label htmlFor="name" className="registration-form__label">
              name *
            </label>
            <input
              id="name"
              name="name"
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
            <label htmlFor="avatar_url" className="registration-form__label">
              avatar url
            </label>
            <input
              id="avatar_url"
              name="avatar_url"
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
