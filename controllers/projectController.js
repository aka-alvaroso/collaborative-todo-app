// /controllers/projectController.js
const { projects } = require('../db');
const { v4: uuidv4 } = require('uuid');

// Crear un nuevo proyecto
exports.createProject = (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  const newProject = {
    id: uuidv4(),
    name,
    description,
    owner: req.user.id // Asumimos que 'req.user' es el usuario autenticado
  };

  projects.push(newProject);
  res.status(201).json(newProject);
};

// Obtener todos los proyectos
exports.getAllProjects = (req, res) => {
  const userProjects = projects.filter(project => project.owner === req.user.id);
  res.status(200).json(userProjects);
}

// Obtener un proyecto por ID
exports.getProjectById = (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  return res.status(200).json(project);
}

exports.updateProject = (req, res) => {
  const projectId = req.params.id;
  const { name, description } = req.body;
  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (name) project.name = name;
  if (description) project.description = description;

  res.status(200).json(project);
};

// Eliminar un proyecto
exports.deleteProject = (req, res) => {
  const projectId = req.params.id;
  const projectIndex = projects.findIndex(p => p.id === projectId && p.owner === req.user.id);

  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects.splice(projectIndex, 1);
  res.status(204).end();
};
