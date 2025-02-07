import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUserAlt, FaProjectDiagram, FaLaptopCode, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-card text-lightText shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          My Portfolio
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex flex-row space-x-6">
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

      {/* Side Menu for Mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-card p-6 space-y-6"
          >
            <div className="text-right">
              <button onClick={toggleMenu} className="text-2xl text-lightText">
                <FaTimes />
              </button>
            </div>
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
                  onClick={toggleMenu} // Close menu on click
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

