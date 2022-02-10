import Articles from "./Articles";

const Home = () => {
  return (
    <div className="content">
      <Articles isHome={true} />
    </div>
  );
};

export default Home;
