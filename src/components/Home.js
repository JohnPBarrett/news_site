import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="content">
      <main>
        <Link to="/articles">articles</Link>
      </main>
    </div>
  );
};

export default Home;
