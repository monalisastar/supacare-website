'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'

const slides = [
  {
    demand: {
      label: 'The Demand',
      text: 'Overflowing garbage in urban areas creates health and environmental hazards.',
      image: '/images/demand-overflowing-waste.png',
    },
    solution: {
      label: 'The Solution',
      text: 'SupaCare conducts waste audits and cleanup drives to restore communities.',
      image: '/images/solution-cleanup-audit.png',
    },
  },
  {
    demand: {
      label: 'The Demand',
      text: 'Unsorted waste often ends up burned, releasing toxic emissions.',
      image: '/images/demand-burning-waste.png',
    },
    solution: {
      label: 'The Solution',
      text: 'Our recycling and composting programs turn waste into valuable resources.',
      image: '/images/solution-recycling-composting.png',
    },
  },
  {
    demand: {
      label: 'The Demand',
      text: 'Corporates often lack guidance on ESG, climate compliance, and sustainability.',
      image: '/images/demand-esg-confusion.png',
    },
    solution: {
      label: 'The Solution',
      text: 'Our consultants help businesses align with SDGs and climate goals.',
      image: '/images/solution-sustainability-consulting.png',
    },
  },
]

export default function DemandSolutionCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setInterval(nextSlide, 8000)
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current)
    }
  }, [paused])

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <section
      className="bg-gradient-to-b from-[#e6f5ea] to-white py-8"
      {...handlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">
            Tackling the Waste Challenge
          </h2>
          <div className="hidden md:flex space-x-3">
            <button onClick={prevSlide} className="px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">←</button>
            <button onClick={nextSlide} className="px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">→</button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mb-3 md:hidden">Swipe left or right</p>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            variants={variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch"
          >
            {/* Demand */}
            <div className="rounded-xl overflow-hidden border border-green-100 shadow-md bg-white/80 backdrop-blur hover:shadow-lg transition">
              <Image
                src={slides[index].demand.image}
                alt={slides[index].demand.label}
                width={800}
                height={500}
                className="w-full h-44 sm:h-52 md:h-[230px] object-cover"
              />
              <div className="p-3">
                <h3 className="text-green-700 font-semibold text-base">{slides[index].demand.label}</h3>
                <p className="text-gray-700 text-sm mt-1">{slides[index].demand.text}</p>
              </div>
            </div>

            {/* Solution */}
            <div className="rounded-xl overflow-hidden border border-green-100 shadow-md bg-white/80 backdrop-blur hover:shadow-lg transition">
              <Image
                src={slides[index].solution.image}
                alt={slides[index].solution.label}
                width={800}
                height={500}
                className="w-full h-44 sm:h-52 md:h-[230px] object-cover"
              />
              <div className="p-3">
                <h3 className="text-green-800 font-semibold text-base">{slides[index].solution.label}</h3>
                <p className="text-gray-700 text-sm mt-1">{slides[index].solution.text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-3 space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'bg-green-700 scale-110' : 'bg-green-200'
              }`}
            />
          ))}
        </div>

        {/* Mobile Buttons */}
        <div className="flex justify-center mt-3 space-x-4 md:hidden">
          <button onClick={prevSlide} className="text-xs bg-green-100 px-3 py-1 rounded hover:bg-green-200">← Prev</button>
          <button onClick={nextSlide} className="text-xs bg-green-100 px-3 py-1 rounded hover:bg-green-200">Next →</button>
        </div>
      </div>
    </section>
  )
}
