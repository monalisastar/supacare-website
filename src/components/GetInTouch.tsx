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
    setRecaptchaToken('mocked-recaptcha-token');
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
      const res = await fetch('/api/contact', { method: 'POST', body: formData });

      if (res.ok) {
        toast.success('Message sent successfully!');
        reset();
        setRecaptchaToken('');
        generateRecaptchaToken();
      } else toast.error('Failed to send message');
    } catch {
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    generateRecaptchaToken();
  }, []);

  return (
    <section
      className="w-full min-h-[60vh] bg-cover bg-center flex items-center justify-center px-4 md:px-16 py-10"
      style={{ backgroundImage: `url('/images/forest-bg.webp')` }}
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* 🟢 Left - Text */}
        <motion.div
          className="md:w-1/2 text-white text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">
            Get in touch
          </h2>
          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            Have a project or idea in mind? Reach out to us — our team will respond shortly.
            Together, we can build a cleaner and more sustainable future.
          </p>
        </motion.div>

        {/* 🧾 Right - Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 w-full bg-white/15 backdrop-blur-lg rounded-lg shadow-md p-5 md:p-6 space-y-3 text-white"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                {...register('firstName')}
                type="text"
                placeholder="First name"
                className={`w-full px-3 py-2 text-sm rounded-md bg-white/10 placeholder-white/70 focus:outline-none ${
                  errors.firstName ? 'border-red-500 border' : 'border-transparent'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Last name"
                className={`w-full px-3 py-2 text-sm rounded-md bg-white/10 placeholder-white/70 focus:outline-none ${
                  errors.lastName ? 'border-red-500 border' : 'border-transparent'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={`w-full px-3 py-2 text-sm rounded-md bg-white/10 placeholder-white/70 focus:outline-none ${
              errors.email ? 'border-red-500 border' : 'border-transparent'
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}

          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone (optional)"
            className="w-full px-3 py-2 text-sm rounded-md bg-white/10 placeholder-white/70 focus:outline-none"
          />

          <select
            {...register('topic')}
            defaultValue=""
            className={`w-full px-3 py-2 text-sm rounded-md bg-[#1a1a1a]/50 text-white focus:outline-none ${
              errors.topic ? 'border-red-500 border' : 'border-transparent'
            }`}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="carbon">Carbon Advisory</option>
            <option value="waste">Waste Management</option>
            <option value="consulting">Sustainability Consulting</option>
          </select>
          {errors.topic && (
            <p className="text-red-400 text-xs">{errors.topic.message}</p>
          )}

          <textarea
            {...register('message')}
            placeholder="Message"
            className={`w-full h-20 px-3 py-2 text-sm rounded-md bg-white/10 placeholder-white/70 focus:outline-none resize-none ${
              errors.message ? 'border-red-500 border' : 'border-transparent'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-400 text-xs">{errors.message.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold text-sm py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default GetInTouch;
