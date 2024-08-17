// Proyectos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/proyectos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };
    fetchProyectos();
  }, []);

  return (
    <div>
      <h2>Mis Proyectos</h2>
      <ul>
        {projects.map(p => (
          <li key={p._id}>{p.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
