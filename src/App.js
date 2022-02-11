import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Articles from "./components/Articles";
import NotFound from "./components/NotFound";
import IndividualArticlePage from "./pages/IndividualArticlePage";
import ArticlesPage from "./pages/ArticlesPage";

function App() {
  let [inputFilter, setInputFilter] = useState("");
  return (
    <BrowserRouter>
      <div className="container">
        <Nav setInputFilter={setInputFilter} inputFilter={inputFilter} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/articles"
            inputFilter={inputFilter}
            element={<ArticlesPage />}
          />
          <Route path="/articles/:id" element={<IndividualArticlePage />} />
          <Route component={NotFound} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
