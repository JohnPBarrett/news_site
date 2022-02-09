import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Userpage from "./components/Userpage";

function App() {
  let { id } = useParams();
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
