// src/components/SocialLinks.tsx
import React from 'react';
import { motion } from 'framer-motion';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex justify-center space-x-6 my-8">
      <motion.a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400"
        whileHover={{ scale: 1.1 }}
      >
        Twitter
      </motion.a>
      <motion.a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
        whileHover={{ scale: 1.1 }}
      >
        LinkedIn
      </motion.a>
      <motion.a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500"
        whileHover={{ scale: 1.1 }}
      >
        Instagram
      </motion.a>
    </div>
  );
};

export default SocialLinks;

