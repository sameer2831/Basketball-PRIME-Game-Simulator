import React from 'react';
import { motion } from 'framer-motion';
import { FaBasketballBall, FaCode, FaRocket, FaDatabase, FaPaintBrush } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section
      id="About"
      className="min-h-screen py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center space-y-10"
      >
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg">
          Behind the Code: Building Basketball PRIME
        </h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          What started as a fan's dream of simulating legendary matchups evolved into a full-fledged interactive engine—powered by real stats, modern web tech, and a passion for basketball analytics.
        </motion.p>

        {/* Story Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left">
          {/* The Spark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <FaBasketballBall className="text-3xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">The Spark</h3>
            <p className="text-gray-400">
              Born from the timeless barbershop debate—who’s the GOAT? Now, stats speak louder than takes. Let’s simulate it.
            </p>
          </motion.div>

          {/* Data Scraping */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <FaDatabase className="text-3xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Matters</h3>
            <p className="text-gray-400">
              We scraped and curated advanced NBA stats (PER, TS%, USG%, etc.) from 2000 onward using <span className="text-yellow-400 font-medium">Python + BeautifulSoup</span> and stored it in <span className="text-yellow-400 font-medium">JSON/CSV</span> format.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <FaCode className="text-3xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">The Stack</h3>
            <p className="text-gray-400">
              Built in <span className="text-yellow-400">React</span>, styled with <span className="text-yellow-400">Tailwind CSS</span>, animated by <span className="text-yellow-400">Framer Motion</span>. Data logic managed with custom simulation engines in <span className="text-yellow-400">JavaScript</span>.
            </p>
          </motion.div>

          {/* Simulator Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <FaPaintBrush className="text-3xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Design Philosophy</h3>
            <p className="text-gray-400">
              Fast, immersive, and responsive. We designed with a “game-day feel,” keeping fans engaged with intuitive UX, momentum swings, and quarter-by-quarter updates.
            </p>
          </motion.div>

          {/* Launch Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md md:col-span-2 lg:col-span-1"
          >
            <FaRocket className="text-3xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">The Vision</h3>
            <p className="text-gray-400">
              To be the go-to arena where fantasy basketball battles are tested with data. No bias. Just ball.
            </p>
          </motion.div>
        </div>

        {/* Closing Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mt-10"
        >
          Whether you're a coach, fan, or data nerd, <span className="text-yellow-400 font-medium">Basketball PRIME</span> brings your dream matchups to life with logic, speed, and soul.
        </motion.p>
      </motion.div>
    </section>
  );
}
