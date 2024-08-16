// /controllers/taskController.js
const Task = require('../models/Task');
const Project = require('../models/Project');
const { v4: uuidv4 } = require('uuid');

// Crear una nueva tarea en un proyecto
exports.createTask = async (req, res) => {
  const { title, description, projectId } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: 'Title and project ID are required' });
  }

  try {
    const newTask = new Task({ title, description, projectId });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Obtener todas las tareas de un proyecto
exports.getTasksByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId });

    if (!tasks.length) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error })
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
}