import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion"; // For smooth animations

const Contact = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          form.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("❌ Failed to send message. Try again.");
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-2xl shadow-xl mt-16"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Contact Me</h2>
      <p className="text-gray-400 text-center mb-4">
        Let's connect! Fill out the form below, and I'll get back to you ASAP.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
        />
        <motion.textarea
          whileFocus={{ scale: 1.05 }}
          name="message"
          placeholder="Your Message"
          required
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 h-32 focus:ring-2 focus:ring-blue-400"
        ></motion.textarea>
        <motion.button
          whileHover={{ scale: 1.1 }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Send Message
        </motion.button>
      </form>
      {status && <p className="text-center mt-4 text-gray-300">{status}</p>}
    </motion.div>
  );
};

export default Contact;

