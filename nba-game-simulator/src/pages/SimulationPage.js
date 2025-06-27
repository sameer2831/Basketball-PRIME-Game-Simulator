import { useEffect, useState } from 'react';
import players from '../data/top_100_elite_players.json';
import TeamSelector from '../components/TeamSelector';
import MatchSimulator from '../components/MatchSimulator';
import logo from '../assets/prime_logo-bg.png';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BasketballLogo = () => (
  <img
    src={logo}
    alt="Basketball Prime Logo"
    className="h-20 w-20 md:h-24 md:w-24 mx-auto mb-2 md:mb-4"
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
    <div className="p-4 sm:p-6 bg-secondary min-h-screen text-base font-display flex flex-col">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        
        {/* Home Button */}
        <Link to="/">
          <button className="px-5 py-2 rounded-lg bg-primary text-black font-semibold hover:bg-yellow-400 transition">
            ← Home
          </button>
        </Link>

        {/* Title + Logo */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
          <BasketballLogo />
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary drop-shadow-lg tracking-wide">
              NBA 5v5 Game Simulator
            </h1>
            <div className="hidden md:block text-3xl slow-spin">🏀</div>
          </div>
        </div>

        {/* Desktop Spacer */}
        <div className="w-[112px] hidden md:block" />
      </header>

      {/* Team Selectors */}
      <main className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        <TeamSelector
          title="Team A"
          players={playerData}
          selectedPlayers={teamA}
          onTeamChange={setTeamA}
          unavailablePlayers={teamB}
        />
        <TeamSelector
          title="Team B"
          players={playerData}
          selectedPlayers={teamB}
          onTeamChange={setTeamB}
          unavailablePlayers={teamA}
        />
      </main>

      {/* Match Simulator */}
      <section className="mt-14 max-w-7xl mx-auto">
        <MatchSimulator teamA={teamA} teamB={teamB} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SimulationPage;
