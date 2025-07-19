"use client";

import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 md:p-16 flex flex-col md:flex-row gap-10"
      >
        <ContactForm />
        <ContactInfo />
      </motion.div>
    </main>
  );
}
