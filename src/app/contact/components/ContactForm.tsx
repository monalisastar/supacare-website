'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Too short'),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  const [recaptchaToken, setRecaptchaToken] = useState('');

  const generateRecaptchaToken = () => {
    setRecaptchaToken('mocked-recaptcha-token');
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!recaptchaToken) {
      toast.error('Please verify reCAPTCHA');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);
    formData.append('recaptchaToken', recaptchaToken);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Message sent successfully!');
        reset();
        setRecaptchaToken('');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  // Generate token on mount
  useState(() => {
    generateRecaptchaToken();
  });

  return (
    <section className="flex-1">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Contact Us</h1>
      <form
        onSubmit={handleSubmit(onSubmit)} // Removed <ContactFormData> generic here
        className="flex flex-col gap-6"
        encType="multipart/form-data"
        noValidate
      >
        {/* Name */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input
            {...register('name')}
            type="text"
            placeholder="Your Name"
            className={`w-full border-b-2 p-3 text-lg outline-none transition-colors ${
              errors.name ? 'border-red-500' : 'border-green-400 focus:border-green-600'
            }`}
          />
          {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>}
        </motion.div>

        {/* Email */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            {...register('email')}
            type="email"
            placeholder="Your Email"
            className={`w-full border-b-2 p-3 text-lg outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-green-400 focus:border-green-600'
            }`}
          />
          {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}
        </motion.div>

        {/* Subject */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            {...register('subject')}
            type="text"
            placeholder="Subject"
            className={`w-full border-b-2 p-3 text-lg outline-none transition-colors ${
              errors.subject ? 'border-red-500' : 'border-green-400 focus:border-green-600'
            }`}
          />
          {errors.subject && <p className="text-red-600 mt-1 text-sm">{errors.subject.message}</p>}
        </motion.div>

        {/* Message */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <textarea
            {...register('message')}
            placeholder="Your Message"
            rows={5}
            className={`w-full border-b-2 p-3 text-lg outline-none transition-colors resize-none ${
              errors.message ? 'border-red-500' : 'border-green-400 focus:border-green-600'
            }`}
          />
          {errors.message && <p className="text-red-600 mt-1 text-sm">{errors.message.message}</p>}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </section>
  );
}
