// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../redux/features/projects/projectsSlice';
import ProjectModal from '../components/ProjectModal';

export default function DashboardPage () {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.status);
  const error = useSelector((state) => state.projects.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (project) => {
    if (selectedProject) {
      await dispatch(updateProject({ ...selectedProject, ...project }));
    } else {
      await dispatch(createProject(project));
    }
    setIsModalOpen(false);
    dispatch(fetchProjects());
  };

  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      await dispatch(deleteProject(projectId));
      dispatch(fetchProjects());
    }
  };

  if (status === 'loading') {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Your Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className='mb-2 pb-2 border-b-2 border-b-neutral-200'>{project.description}</p>
            <button onClick={() => handleEditProject(project)} className='bg-amber-500 text-white p-1.5 rounded-full m-2' >Edit</button>
            <button onClick={() => handleDeleteProject(project._id)} className='bg-red-500 text-white p-1.5 rounded-full m-2'>Delete</button>
          </div>
        ))}
        <div onClick={handleAddProject} className="bg-neutral-200 p-4 rounded-lg shadow cursor-pointer">
          <h2 className="text-xl font-bold ">+ Add New Project</h2>
        </div>
      </div>
      {isModalOpen && (
        <ProjectModal
          onSave={handleSaveProject}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </div>
  );
}
