import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound__container">
      <p className="notfound__404-message">404</p>
      <p className="notfound__error-message">The page you requested could not be found</p>
      <Link to="/">
        <button type="button" className="btn notfound__link-button">
          return home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
