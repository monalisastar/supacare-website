'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}

// Updated schema using ObjectSchema
const schema: yup.ObjectSchema<ContactFormData> = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'Too short'),
  lastName: yup.string().required('Last name is required').min(2, 'Too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().notRequired(),
  topic: yup.string().required('Topic is required'),
  message: yup.string().required('Message is required').min(10, 'Too short'),
}) as yup.ObjectSchema<ContactFormData>;

const GetInTouch = () => {
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
    setRecaptchaToken('mocked-recaptcha-token'); // replace with real reCAPTCHA later
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!recaptchaToken) {
      toast.error('Please verify reCAPTCHA');
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value.toString());
    });
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
        generateRecaptchaToken();
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    generateRecaptchaToken();
  }, []);

  return (
    <section
      className="w-full min-h-[85vh] bg-cover bg-center flex items-center justify-center px-4 md:px-20 py-10"
      style={{ backgroundImage: `url('/images/forest-bg.png')` }}
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
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 w-full bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8 space-y-4 text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            {...register('firstName')}
            type="text"
            placeholder="First name"
            className={`w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none ${
              errors.firstName ? 'border-red-500 border-2' : ''
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

          <input
            {...register('lastName')}
            type="text"
            placeholder="Last name"
            className={`w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none ${
              errors.lastName ? 'border-red-500 border-2' : ''
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none ${
              errors.email ? 'border-red-500 border-2' : ''
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone number"
            className="w-full px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none"
          />

          <select
            {...register('topic')}
            defaultValue=""
            className={`w-full px-4 py-3 rounded-md bg-[#1a1a1a]/60 text-white focus:outline-none ${
              errors.topic ? 'border-red-500 border-2' : ''
            }`}
          >
            <option value="" disabled>Select a topic</option>
            <option value="carbon">Carbon Advisory</option>
            <option value="waste">Waste Management</option>
            <option value="consulting">Sustainability Consulting</option>
          </select>
          {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}

          <textarea
            {...register('message')}
            placeholder="Message"
            className={`w-full h-24 px-4 py-3 rounded-md bg-white/10 placeholder-white/80 focus:outline-none resize-none ${
              errors.message ? 'border-red-500 border-2' : ''
            }`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default GetInTouch;
