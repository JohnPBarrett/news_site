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
import UserPage from './pages/UserPage';
import CreateArticlePage from './pages/CreateArticlePage';

function App() {
  const [user, setUser] = useState('guest');
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<IndividualArticlePage />} />
            <Route path="/articles/new" element={<CreateArticlePage />} />
            <Route path="/login" element={user === 'guest' ? <LoginPage /> : <Navigate to="/" />} />
            <Route
              path="/register"
              element={user === 'guest' ? <RegistrationPage /> : <Navigate to="/" />}
            />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
