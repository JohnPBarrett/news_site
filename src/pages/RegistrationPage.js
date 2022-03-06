import './authforms.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { registeruser } from '../utils/api';

function RegistrationPage() {
  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const signUp = async (event) => {
    event.preventDefault();
    setError('');
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      name: event.target.name.value,
      avatar_url: event.target.avatar_url.value
    };

    try {
      const response = await registeruser(data);

      setUser(data.username);
      setToken(response.data.user.token);
      navigate('/');
    } catch (err) {
      setError('Error occured during sign up');
    }
  };

  return (
    <div className="content">
      <div className="form__container">
        <h1>Sign up</h1>
        {error && <h2>{error}</h2>}

        <form className="form" action="post" onSubmit={(e) => signUp(e)}>
          <div className="form__group">
            <label htmlFor="username" className="form__label">
              Username *
            </label>
            <input id="username" name="username" type="text" className="form__control" required />
          </div>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              name *
            </label>
            <input id="name" name="name" type="text" className="form__control" required />
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
          <div className="form__group">
            <label htmlFor="avatar_url" className="form__label">
              avatar url
            </label>
            <input id="avatar_url" name="avatar_url" type="text" className="form__control" />
          </div>
          <div className="form__group btn__form-right">
            <button type="submit" id="registration" className="form__group-button">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
