// src/components/Footer.tsx
import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-muted py-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          {[
            { link: 'https://x.com/suspiicy', icon: <FaTwitter /> },
            { link: 'https://linkedin.com/sahas001', icon: <FaLinkedin /> },
            { link: 'https://github.com/Sahas001', icon: <FaGithub /> },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-accent"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Sahas Timilsina. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

