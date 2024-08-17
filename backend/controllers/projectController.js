// /controllers/projectController.js
const Project = require('../models/Project');
const { v4: uuidv4 } = require('uuid');

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  try {
    const newProject = new Project({
      name,
      description,
      owner: req.user.id,
    });
    await newProject.save();

    res.status(201).json({ project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    }).populate('owner', 'username')
      .populate('collaborators', 'username');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
}

// Obtener un proyecto por ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner._id.toString() !== req.user.id && !project.collaborators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

// Actualizar un proyecto
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner._id.toString() !== req.user.id && !project.collaborators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Eliminar un proyecto
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner._id.toString() !== req.user.id && !project.collaborators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};

// Añadir un colaborador
exports.addCollaborator = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Verificar que el usuario autenticado es el owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the project owner can add collaborators' });
    }

    const { collaboratorId } = req.body;

    // Verificar que el colaborador no esté ya en la lista
    if (project.collaborators.includes(collaboratorId)) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    project.collaborators.push(collaboratorId);
    await project.save();

    res.status(200).json({ message: 'Collaborator added successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error adding collaborator', error });
  }
};
