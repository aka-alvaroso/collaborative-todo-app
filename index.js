// index.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');

const mongoURI =


  app.use(express.json());

// Autenticación
app.use('/auth', authRoutes);

// Proyectos
app.use('/projects', projectRoutes);

// Tareas
app.use('/tasks', taskRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
