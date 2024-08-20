// pages/DashboardPage.js

import React, { useState } from 'react';
import axios from '../axiosConfig';

// RegisterPage.js
export default function RegisterPage () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Si hay error, mostrarlo al usuario
  const [success, setSuccess] = useState(''); // Si hay éxito, mostrarlo al usuario

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/auth/register', {
        username,
        password,
      });

      if (response.status === 201) {
        setSuccess('User registered successfully!');
        // Aquí puedes redirigir al usuario al login, limpiar el formulario, etc.
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-black focus:border-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-black focus:border-2 transition-border duration-300"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <button
            type="submit"
            className="w-100 bg-black text-white border rounded-full w-full p-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
