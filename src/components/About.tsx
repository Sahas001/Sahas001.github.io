// src/components/About.tsx
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="container mx-auto py-12 px-4 mt-16">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-lightText mb-8 text-center"
      >
        About Me
      </motion.h2>
      <div className="flex flex-col md:flex-row items-center">
        <motion.img
          src="https://img.freepik.com/premium-vector/doodle-man-drawn-childish-style-vector-illustration_362838-540.jpg"
          alt="Profile"
          className="rounded-full w-64 h-64 mb-8 md:mb-0 md:mr-8 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lightText"
        >
          <p className="mb-4">
            I am a motivated and hardworking computer engineering graduate with expertise in React, Golang, TypeScript, JavaScript, and full‑stack development.
          </p>
          <p>
            My passion for technology and commitment to excellence have driven me to build diverse and innovative projects. I am always looking to push the boundaries of what’s possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

