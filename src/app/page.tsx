'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SustainabilityActions from '../components/SustainabilityActions'
import About from '../components/About'
import ApproachSection from '../components/ApproachSection'
import WhySupaCare from '../components/WhySupaCare'
import Projects from '../components/Projects'
import DemandSolutionCarousel from '../components/DemandSolutionCarousel'
import GetInTouch from '../components/GetInTouch'
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

      {/* ✅ Floating Sustainable Actions Section */}
      <section id="actions">
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

      {/* ✅ New Approach Section (bridge before Projects) */}
      <motion.section
        id="approach"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <ApproachSection />
      </motion.section>

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
        id="why-Supacare"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-100"
      >
        <WhySupaCare />
      </motion.section>

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
