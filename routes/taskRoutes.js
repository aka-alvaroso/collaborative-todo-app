// /routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Crear una nueva tarea en un proyecto
router.post('/projects/:projectId', taskController.createTask);

// Obtener todas las tareas de un proyecto
router.get('/projects/:projectId', taskController.getTasksByProjectId);

// Obtener una tarea por ID
router.get('/projects/:projectId/tasks/:taskId', taskController.getTaskById);

// Actualizar una tarea
router.put('/projects/:projectId/tasks/:taskId', taskController.updateTask);

// Eliminar un proyecto
router.delete('/projects/:projectId/tasks/:taskId', taskController.deleteTask);

module.exports = router;
