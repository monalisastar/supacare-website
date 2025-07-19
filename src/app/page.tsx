'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import WhySupaCare from '../components/WhySupaCare'
import Projects from '../components/Projects'
import SustainabilityBanner from '../components/SustainabilityBanner'
import DemandSolutionCarousel from '../components/DemandSolutionCarousel'
import CTASection from '../components/CTASection'
import GetInTouch from '../components/GetInTouch'
import ImpactSection from '../components/ImpactSection'

import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <motion.section
        id="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <CTASection />
      </motion.section>

      <motion.section
        id="sustainability"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-10"
      >
        <SustainabilityBanner />
      </motion.section>

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

      <motion.section
        id="solutions"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-50"
      >
        <DemandSolutionCarousel />
      </motion.section>

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
