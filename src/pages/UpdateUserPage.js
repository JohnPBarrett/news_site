import './authforms.css';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { updateUserData } from '../utils/api';
import UserContext from '../context/UserContext';

function UpdateUserPage() {
  const { token, user } = useContext(UserContext);
  const [error, setError] = useState('');
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (username !== user) navigate('/');
    }

    return () => {
      ignore = true;
    };
  }, [location.pathname]);

  const updateUserInfo = async (event) => {
    event.preventDefault();
    setError('');
    const data = {
      name: event.target.name.value,
      avatar_url: event.target.avatar_url.value,
      username: user
    };

    try {
      await updateUserData(data, token);

      navigate('/');
    } catch (err) {
      setError('Error occured when updating your information');
    }
  };

  return (
    <div className="content">
      {error && <p className="error-message">{error}</p>}
      <div className="form__container">
        <h1>Update details</h1>
        <form className="form" action="post" onSubmit={(e) => updateUserInfo(e)}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form__control"
              minLength={2}
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
            <button type="submit" id="update" className="form__group-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserPage;
