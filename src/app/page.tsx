'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '../components/Hero'
import SustainabilityActions from '../components/SustainabilityActions'
import OurFocusAreas from '../components/OurFocusAreas'
import About from '../components/About'
import WhySupaCare from '../components/WhySupaCare'
import Projects from '../components/Projects'
import GetInTouch from '../components/GetInTouch'
import Partners from '@/components/Partners'
import ImpactSection from '../components/ImpactSection'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* ✅ Shared Gradient Wrapper for Sustainability + Focus Areas */}
      <div className="relative bg-gradient-to-b from-white via-green-50 to-white">
        {/* Floating Sustainable Actions Section (unchanged overlap) */}
        <section id="actions" className="relative z-10">
          <SustainabilityActions />
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12"
        >
          <About />
        </motion.section>

        {/* ✅ Our Focus Areas Section (no white gap, smooth merge) */}
        <motion.section
          id="focus-areas"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 -mt-2"
        >
          <OurFocusAreas />
        </motion.section>
      </div>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16"
      >
        <Projects />
      </motion.section>

      {/* Why Supacare */}
      <motion.section
        id="why-supacare"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-100"
      >
        <WhySupaCare />
      </motion.section>
      <Partners />

      {/* Impact Section */}
      <motion.section
        id="impact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-white"
      >
        <ImpactSection />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="get-in-touch"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16 bg-green-50"
      >
        <GetInTouch />
      </motion.section>
    </main>
  )
}
