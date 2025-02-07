// src/components/Skills.tsx
import React from 'react';
import { FaReact, FaNodeJs, FaJava, FaPython } from 'react-icons/fa';
import { SiTypescript, SiGoland, SiJavascript } from 'react-icons/si';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', icon: <FaReact size={40} color="#61DBFB" /> },
  { name: 'TypeScript', icon: <SiTypescript size={40} color="#3178C6" /> },
  { name: 'JavaScript', icon: <SiJavascript size={40} color="#F7DF1E" /> },
  { name: 'Golang', icon: <SiGoland size={40} color="#00ADD8" /> },
  { name: 'Backend', icon: <FaNodeJs size={40} color="#68A063" /> },
  { name: 'Others', icon: <FaJava size={40} color="#f89820" /> },
  { name: 'Python', icon: <FaPython size={40} color="#306998" /> },
];

const Skills: React.FC = () => {
  return (
    <section className="container mx-auto py-12 px-4">
      <motion.h2
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-lightText mb-8 text-center"
      >
        Skills
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {skills.map(skill => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center bg-card p-6 rounded shadow hover:shadow-xl transition"
            whileHover={{ scale: 1.1 }}
          >
            {skill.icon}
            <span className="mt-4 text-lightText font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;


