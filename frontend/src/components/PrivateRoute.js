import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        await axios.get('/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    };

    verifyToken();
  }, [token]);

  if (isAuthenticated === null) {
    // Podrías mostrar un spinner o algo similar mientras se verifica el token
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

};

export default PrivateRoute;