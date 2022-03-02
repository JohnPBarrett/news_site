import './authforms.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { registeruser } from '../utils/api';

function RegistrationPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      name: event.target.name.value,
      avatar_url: event.target.avatar_url.value
    };

    try {
      await registeruser(data);

      setUser(data.username);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content">
      <div className="form__container">
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
          <div className="form__group">
            <button type="button" id="registration">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
