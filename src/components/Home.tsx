// src/components/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?tech')" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-black bg-opacity-50 p-10 rounded text-center max-w-lg w-full"
      >
        <h1 className="text-5xl text-lightText font-bold mb-4">
          Hi, I’m [Your Name]
        </h1>
        <p className="text-xl text-muted mb-6">
          A Computer Engineering graduate, passionate about React, Golang, and full‑stack development.
        </p>
        <a
          href="/about"
          className="bg-accent text-white px-6 py-3 rounded hover:bg-blue-500 transition"
        >
          Learn More About Me
        </a>
      </motion.div>
    </section>
  );
};

export default Home;

