// src/components/Navbar.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUserAlt, FaProjectDiagram, FaLaptopCode, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-card text-lightText shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          My Portfolio
        </Link>
        <div className="flex space-x-6">
          {[
            { path: '/', name: 'Home', icon: <FaHome /> },
            { path: '/about', name: 'About', icon: <FaUserAlt /> },
            { path: '/projects', name: 'Projects', icon: <FaProjectDiagram /> },
            { path: '/skills', name: 'Skills', icon: <FaLaptopCode /> },
            { path: '/contact', name: 'Contact', icon: <FaEnvelope /> },
          ].map(link => (
            <motion.div key={link.name} whileHover={{ scale: 1.1 }}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  "flex items-center space-x-2 hover:text-accent " +
                  (isActive ? "text-accent font-bold" : "")
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


