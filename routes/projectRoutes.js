// /routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Crear un nuevo proyecto
router.post('/', projectController.createProject);

// Obtener todos los proyectos
router.get('/', projectController.getAllProjects);

// Obtener un proyecto por ID
router.get('/:id', projectController.getProjectById);

// Actualizar un proyecto
router.put('/:id', projectController.updateProject);

// Eliminar un proyecto
router.delete('/:id', projectController.deleteProject);

// Añadir colaboradores
router.post('/:id/collaborators', projectController.addCollaborator);

module.exports = router;
