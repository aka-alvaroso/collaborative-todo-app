// /controllers/taskController.js
const { projects } = require('../db');
const { v4: uuidv4 } = require('uuid');

// Crear una nueva tarea en un proyecto
exports.createTask = (req, res) => {
  const projectId = req.params.projectId;
  const { title, description } = req.body;

  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    status: 'pending'
  }

  // Inicializar el array de tareas si no existe
  if (!project.tasks) {
    project.tasks = [];
  }

  project.tasks.push(newTask);
  res.status(201).json(newTask);
};

// Obtener todas las tareas de un proyecto
exports.getTasksByProjectId = (req, res) => {
  const projectId = req.params.projectId;

  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.status(200).json(project.tasks || []);
};

// Obtener una tarea por ID
exports.getTaskById = (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;

  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const task = (project.tasks || []).find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json(task);
};

// Actualizar una tarea
exports.updateTask = (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const { title, description, status } = req.body;

  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const task = (project.tasks || []).find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  res.status(200).json(task);
};

// Eliminar una tarea
exports.deleteTask = (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;

  const project = projects.find(p => p.id === projectId && p.owner === req.user.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const taskIndex = (project.tasks || []).findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  project.tasks.splice(taskIndex, 1);
  res.status(204).end();
}