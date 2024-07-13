import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './component/HomePage';
import FavoritesPage from './component/FavoritesPage';
import EmployeeDetails from './component/EmployeeDetails';
import { EmployeeProvider } from './context/EmployeeContext';
import './App.css';

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <nav className="navbar">
          <div className="container">
            <Link className="navbar-item home-button" to="/">Home</Link>
            <Link className="navbar-item favorites-button" to="/favorites">Favorites</Link>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;