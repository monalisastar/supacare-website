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
  topic: yup.string().required('Please select a topic'),
  message: yup.string().required('Message is required').min(10, 'Too short'),
}) as yup.ObjectSchema<ContactFormData>;

export default function GetInTouch() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: yupResolver(schema) });

  const [recaptchaToken, setRecaptchaToken] = useState('');

  useEffect(() => {
    setRecaptchaToken('mocked-recaptcha-token');
  }, []);

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
        setTimeout(() => setRecaptchaToken('mocked-recaptcha-token'), 500);
      } else toast.error('Failed to send message');
    } catch {
      toast.error('Network error — please try again later.');
    }
  };

  return (
    <section
      id="get-in-touch"
      aria-label="Contact Supacare Solutions"
      className="relative w-full min-h-[65vh] flex items-center justify-center px-4 md:px-16 py-16 overflow-hidden"
    >
      {/* 🌿 Background Layer */}
      <div className="absolute inset-0">
        <img
          src="/images/forest-bg.webp"
          alt="Forest background representing sustainability"
          className="w-full h-full object-cover brightness-[0.6]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-green-900/40 backdrop-blur-[2px]" />
      </div>

      {/* 🌍 Foreground Content */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Left Section */}
        <motion.div
          className="md:w-1/2 text-white text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-[#fcbf49]">
            Get in Touch
          </h2>
          <p className="text-base opacity-95 leading-relaxed max-w-md mx-auto md:mx-0">
            Have a project or idea in mind? Reach out to our team of environmental
            consultants. Together, we’ll create sustainable solutions that make a real impact.
          </p>
        </motion.div>

        {/* Right Section - Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          role="form"
          aria-label="Contact form"
          className="md:w-1/2 w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-8 space-y-5 text-white border border-white/30"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                {...register('firstName')}
                id="firstName"
                type="text"
                placeholder="e.g. Brian"
                className={`w-full px-3 py-2 text-base rounded-md bg-white/15 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.firstName ? 'border-red-500 border' : 'border-transparent'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                {...register('lastName')}
                id="lastName"
                type="text"
                placeholder="e.g. Njata"
                className={`w-full px-3 py-2 text-base rounded-md bg-white/15 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.lastName ? 'border-red-500 border' : 'border-transparent'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full px-3 py-2 text-base rounded-md bg-white/15 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.email ? 'border-red-500 border' : 'border-transparent'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone (optional)
            </label>
            <input
              {...register('phone')}
              id="phone"
              type="tel"
              placeholder="e.g. +254712345678"
              className="w-full px-3 py-2 text-base rounded-md bg-white/15 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-1">
              Topic <span className="text-red-400">*</span>
            </label>
            <select
              {...register('topic')}
              id="topic"
              defaultValue=""
              className={`w-full px-3 py-2 text-base rounded-md bg-[#1a1a1a]/40 text-white focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.topic ? 'border-red-500 border' : 'border-transparent'
              }`}
            >
              <option value="" disabled>
                Select a topic
              </option>
              <option value="carbon">Carbon Advisory</option>
              <option value="waste">Waste Management</option>
              <option value="consulting">Sustainability Consulting</option>
              <option value="partnerships">Partnership Opportunities</option>
            </select>
            {errors.topic && (
              <p className="text-red-400 text-xs mt-1">{errors.topic.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('message')}
              id="message"
              placeholder="Type your message..."
              className={`w-full h-28 px-3 py-2 text-base rounded-md bg-white/15 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none ${
                errors.message ? 'border-red-500 border' : 'border-transparent'
              }`}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1b4332] hover:bg-green-800 text-white font-semibold text-base py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>

      {/* Gradient Overlay to Footer */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#E9FCE9]/90 to-[#E9FCE9]" />
    </section>
  );
}
