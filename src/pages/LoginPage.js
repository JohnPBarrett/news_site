import './LoginPage.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { loginUser } from '../utils/api';

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    try {
      await loginUser(data);
      setUser(data.username);
      navigate('/');
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
            />
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
            />
          </div>

          <div className="login-form__group">
            <button type="button" id="login">
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
