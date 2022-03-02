import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/nav/Nav';
import Home from './pages/HomePage';
import NotFound from './components/utils/NotFound';
import IndividualArticlePage from './pages/IndividualArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import LoginPage from './pages/LoginPage';
import UserContext from './context/UserContext';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  const [inputFilter, setInputFilter] = useState('');
  const [user, setUser] = useState('guest');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="container">
          <Nav setInputFilter={setInputFilter} inputFilter={inputFilter} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" inputFilter={inputFilter} element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<IndividualArticlePage />} />
            <Route path="/login" element={user === 'guest' ? <LoginPage /> : <Navigate to="/" />} />
            <Route
              path="/register"
              element={user === 'guest' ? <RegistrationPage /> : <Navigate to="/" />}
            />
            <Route component={NotFound} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
