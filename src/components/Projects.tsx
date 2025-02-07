// src/components/Projects.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get('https://api.github.com/users/Sahas001/repos')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <section className="container mx-auto py-12 px-4">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-lightText mb-8 text-center"
      >
        My Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <motion.a
            key={project.id}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="bg-card p-6 rounded shadow hover:shadow-xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-lightText">{project.name}</h3>
            <p className="mt-4 text-muted">
              {project.description || 'No description available.'}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;

