import './authforms.css';
import './LoginPage.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { getUserData, loginUser } from '../utils/api';

function LoginPage() {
  const { setUser, setToken, setAvatar } = useContext(UserContext);
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
      const response = await loginUser(data);

      setUser(data.username);
      setToken(response.data.user.token);

      const avatar = await getUserData(data.username);
      setAvatar(avatar.user.avatar_url);

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
        <p>Username: grumpy19</p>
        <p>Password: grumpy191</p>
      </div>
      {error && <p className="error-message">{error}</p>}
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
