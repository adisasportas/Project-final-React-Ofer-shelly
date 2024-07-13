import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { fetchEmployees } from '../api/api';
import '../CSS/HomePage.css';
const FavoritesPage = () => {
    const { favorites, addToFavorites, isFavorite } = useEmployees();
  
    return (
      <div className="favorites-container">
        <h1 className="favorites-title">Favorites</h1>
        <ul className="favorites-list">
          {favorites.map((worker, index) => (
            <li key={index} className="favorites-item">
              <img src={worker.picture.thumbnail} alt={worker.name.first} className="favorites-thumbnail" />
              <div className="favorites-details">
                <h5>{worker.name.first} {worker.name.last}</h5>
                <p>Age: {worker.dob.age}</p>
                <p>Location: {worker.location.city}, {worker.location.country}</p>
                <p>Company: {worker.company}</p>
                <button onClick={() => addToFavorites(worker)} className="favorites-button">
                  {isFavorite(worker.login.uuid) ? 'Unfavorite' : 'Save Favorite'}
                </button>
                <Link to={`/employee/${worker.login.uuid}`}>
                  <button className="details-button">More Details</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default FavoritesPage;