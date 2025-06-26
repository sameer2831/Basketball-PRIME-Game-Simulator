import React, { useState, useRef, useEffect } from 'react';
import { generateLineups } from '../utils/permutationHelper';

export default function PermutationGenerator({ allPlayers = [] }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef(null);

  const togglePlayer = (player) => {
    setSelectedPlayers((prev) =>
      prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
    );
  };

  const handleGenerate = () => {
    if (selectedPlayers.length < 5 || selectedPlayers.length > 10) {
      alert('Select between 5 to 10 players to generate permutations.');
      return;
    }
    const generated = generateLineups(selectedPlayers);
    setLineups(generated);
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!scrollRef.current || lineups.length === 0) return;

    const interval = setInterval(() => {
      if (!paused && scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollLeft = 0; // Reset to start
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [paused, lineups]);

  return (
    <section className="py-12 px-6 bg-gray-50 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center">🧠 Permutation Generator</h2>

      {/* Player Pool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6">
        {allPlayers.map((player) => (
          <button
            key={player}
            onClick={() => togglePlayer(player)}
            className={`p-2 border rounded ${
              selectedPlayers.includes(player)
                ? 'bg-primary text-black font-semibold'
                : 'bg-white'
            }`}
          >
            {player}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleGenerate}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Generate Lineups
        </button>
      </div>

      {/* Horizontal Scrolling Lineup Cards */}
      {lineups.length > 0 && (
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-gray-300 pt-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {lineups.map((lineup, i) => (
            <div
              key={i}
              className="inline-block align-top mx-2 w-72 p-4 border rounded bg-white shadow transition-transform transform hover:scale-105"
            >
              <h4 className="text-lg font-bold mb-2">Lineup {i + 1}</h4>
              <ul className="list-disc pl-6 text-sm">
                {lineup.map((player) => (
                  <li key={player}>{player}</li>
                ))}
              </ul>
              <button className="mt-4 px-4 py-1 bg-primary text-black rounded hover:bg-yellow-400">
                Simulate This Lineup
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
