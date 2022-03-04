import './authforms.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
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
      <div className="form__container">
        <h1>Login</h1>
        <form className="form" onSubmit={(e) => login(e)}>
          <div className="form__group">
            <label htmlFor="username" className="form__label">
              Username *
            </label>
            <input id="username" name="username" type="text" className="form__control" required />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form__control"
              required
            />
          </div>

          <div className="form__group btn__form-right">
            <button type="submit" id="login" className="form__group-button">
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
