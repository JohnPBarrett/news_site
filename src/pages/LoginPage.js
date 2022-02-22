import "./LoginPage.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    try {
      const response = await loginUser(data);
      setUser(data.username);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content">
      <div className="login-form__container">
        <form className="login-form" onSubmit={(e) => login(e)}>
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
            <button id="login">login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
