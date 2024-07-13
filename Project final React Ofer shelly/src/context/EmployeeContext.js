import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchEmployees } from '../api/api';

const EmployeeContext = createContext();

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// רשימת חברות מדומה
const companies = ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Apple'];

const addCompanyToEmployees = (employees) => {
  return employees.map(emp => ({
    ...emp,
    company: companies[Math.floor(Math.random() * companies.length)]
  }));
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(getInitialFavorites());
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        const employeesWithCompany = addCompanyToEmployees(data);
        setEmployees(employeesWithCompany);
      } catch (err) {
        setError('Failed to fetch employees.');
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (employee) => {
    if (!favorites.some(fav => fav.login.uuid === employee.login.uuid)) {
      setFavorites([...favorites, employee]);
    } else {
      setFavorites(favorites.filter(fav => fav.login.uuid !== employee.login.uuid));
    }
  };

  const isFavorite = (employeeId) => {
    return favorites.some(fav => fav.login.uuid === employeeId);
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, favorites, addToFavorites, isFavorite, error }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
