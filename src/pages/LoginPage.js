import './authforms.css';
import './LoginPage.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { loginUser } from '../utils/api';

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const login = async (event) => {
    event.preventDefault();
    setError('');
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    try {
      await loginUser(data);
      setUser(data.username);
      navigate('/');
    } catch (err) {
      setError('Error occured during login');
    }
  };

  return (
    <div className="content login__container">
      <div className="login__test-user-example">
        <p>
          If you would like to login as a pre-existing test user then please use the following
          details:
        </p>
        <p>Username: tickle122</p>
        <p>Password: tickle1221</p>
      </div>
      <div className="form__container">
        <h1>Login</h1>
        {error && <h2>{error}</h2>}

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
