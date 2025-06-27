import { useState } from 'react';
import { motion } from 'framer-motion';

import TeamSelector from '../DemoTeamSelector';
import QuickSim from '../QuickSim';

export default function DemoSection() {
  const allPlayers = [
    'LeBron',
    'Kobe',
    'Shaq',
    'Curry',
    'Durant',
    'Wade',
    'Duncan',
    'Giannis',
    'Dirk',
    'CP3',
  ];

  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  return (
    <section
      id="Demo"
      className="min-h-screen py-24 px-6 bg-primary text-black overflow-hidden"
    >
      {/* Top Centered Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
          See Your Dream Lineup in Action
        </h2>
        <p className="text-lg text-gray-800">
          Mix Kobe, LeBron, Steph, Tim Duncan, and Shaq? Or KD, CP3, Giannis, Kawhi, and Embiid?
          Run it and see who comes out on top.
        </p>
      </motion.div>

      {/* Team Selector + Video + QuickSim */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 max-w-7xl mx-auto">
        {/* Left: Team Selector & Sim */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <TeamSelector
              allPlayers={allPlayers}
              teamA={teamA}
              setTeamA={setTeamA}
              teamB={teamB}
              setTeamB={setTeamB}
            />
            <QuickSim teamA={teamA} teamB={teamB} />
          </div>
        </motion.div>

        {/* Right: Demo Video */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <video
            src="/demo.mp4"
            autoPlay
            muted
            loop
            preload="none"
            loading="lazy"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
        </motion.div>
      </div>
    </section>
  );
}
