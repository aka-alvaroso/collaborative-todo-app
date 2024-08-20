// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Asegúrate de que este sea el puerto donde corre tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
