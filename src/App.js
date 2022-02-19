import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/HomePage";
import NotFound from "./components/NotFound";
import IndividualArticlePage from "./pages/IndividualArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./context/UserContext";

function App() {
  const [inputFilter, setInputFilter] = useState("");
  const [user, setUser] = useState("guest");

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
            <Route path="/login" element={<LoginPage />} />
            <Route component={NotFound} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
