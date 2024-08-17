// index.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

// Conexión a MongoDB
connectDB();

app.use(cors());

app.use(express.json());

// Autenticación
app.use('/auth', authRoutes);

// Proyectos
app.use('/projects', projectRoutes);

// Tareas
app.use('/tasks', taskRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
