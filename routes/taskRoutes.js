// /routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Crear una nueva tarea en un proyecto
router.post('/projects/', taskController.createTask);

// Obtener todas las tareas de un proyecto
router.get('/projects/:projectId', taskController.getTasksByProjectId);

// Actualizar una tarea
router.put('/projects/:id', taskController.updateTask);

// Eliminar un proyecto
router.delete('/projects/:id', taskController.deleteTask);

module.exports = router;
