import { useEffect, useState } from 'react';
import players from '../data/top_100_elite_players.json';
import TeamSelector from '../components/TeamSelector';
import MatchSimulator from '../components/MatchSimulator';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const BasketballLogo = () => (
  <img
    src={logo}
    alt="Basketball Logo"
    className="h-28 w-28 mx-auto mb-4"
  />
);

const SimulationPage = () => {
  const [playerData, setPlayerData] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  useEffect(() => {
    setPlayerData(players);
  }, []);

  return (
    <div className="p-6 bg-secondary min-h-screen text-base font-display">
      
    <div className="flex items-center justify-between mb-10 px-4 flex-wrap gap-4">
    
    {/* Home Button */}
    <Link to="/">
      <button className="px-5 py-2 rounded-lg bg-primary text-black font-semibold hover:bg-yellow-400 transition">
        ← Home
      </button>
    </Link>

    {/* Logo + Heading */}
    <div className="flex items-center gap-4 justify-center mx-auto">
      <BasketballLogo />
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-lg tracking-wide whitespace-nowrap">
        NBA 5v5 Game Simulator 🏀
      </h1>
    </div>

  </div>

      <div className="flex flex-col md:flex-row gap-10 max-w-7xl mx-auto px-4">
        <TeamSelector
          title="Team A"
          players={playerData}
          selectedPlayers={teamA}
          onTeamChange={setTeamA}
        />
        <TeamSelector
          title="Team B"
          players={playerData}
          selectedPlayers={teamB}
          onTeamChange={setTeamB}
        />
      </div>

      <div className="mt-14 max-w-7xl mx-auto px-4">
        <MatchSimulator teamA={teamA} teamB={teamB} />
      </div>
    </div>
  );
};

export default SimulationPage;
