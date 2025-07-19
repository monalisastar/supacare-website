'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GetInTouch = () => {
  return (
    <section
      className="w-full min-h-[85vh] bg-cover bg-center flex items-center justify-center px-4 md:px-20 py-10"
      style={{
        backgroundImage: `url('/images/forest-bg.png')`,
      }}
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Left side - Text */}
        <motion.div
          className="md:w-1/2 w-full text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            Get in touch
          </h2>
          <p className="text-base md:text-lg drop-shadow-md">
            Have a project in mind or want to collaborate? Fill in the form and our team will respond shortly.
            Let’s create a more sustainable future together.
          </p>
        </motion.div>

        {/* Right side - Form */}
        <motion.form
          className="md:w-1/2 w-full bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8 space-y-4 text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="First name"
            className="w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none"
          />
          <select
  className="w-full px-4 py-3 rounded-md bg-[#1a1a1a]/60 text-white focus:outline-none"
  defaultValue=""
>
  <option value="" disabled className="bg-[#1a1a1a] text-white/80">
    Select a topic
  </option>
  <option value="carbon" className="bg-[#1a1a1a] text-white">Carbon Advisory</option>
  <option value="waste" className="bg-[#1a1a1a] text-white">Waste Management</option>
  <option value="consulting" className="bg-[#1a1a1a] text-white">Sustainability Consulting</option>
</select>

          <textarea
            placeholder="Message"
            className="w-full h-24 px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default GetInTouch;
