import { useState } from 'react';

export default function QuickSim({ teamA, teamB }) {
  const [result, setResult] = useState(null);

  const runSimulation = () => {
    if (teamA.length === 0 || teamB.length === 0) {
      setResult('Please select players for both teams.');
      return;
    }

    // Simple scoring based on number of players (replace with your own logic)
    const teamAScore = 70 + teamA.length * 10 + Math.floor(Math.random() * 20);
    const teamBScore = 70 + teamB.length * 10 + Math.floor(Math.random() * 20);

    const winner =
      teamAScore > teamBScore ? 'Team A wins!' : teamAScore < teamBScore ? 'Team B wins!' : 'It\'s a tie!';

    setResult(`Team A ${teamAScore} - Team B ${teamBScore}. ${winner}`);
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={runSimulation}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Run Quick Simulation
      </button>
      {result && <p className="mt-4 text-xl font-bold">{result}</p>}
    </div>
  );
}
