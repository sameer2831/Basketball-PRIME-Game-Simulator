import { useEffect, useState } from 'react';
import players from '../data/top_100_elite_players.json';
import TeamSelector from '../components/TeamSelector';
import MatchSimulator from '../components/MatchSimulator';
import logo from '../assets/logo.png';

const BasketballLogo = () => (
  <img
    src={logo}
    alt="Basketball Logo"
    className="h-28 w-28 mx-auto mb-4"
  />
);

const Home = () => {
  const [playerData, setPlayerData] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  useEffect(() => {
    setPlayerData(players);
  }, []);

  return (
    <div className="p-6 bg-secondary min-h-screen text-base font-display">
      <BasketballLogo />
      <h1 className="text-4xl font-extrabold text-primary text-center mb-12 drop-shadow-lg tracking-wide">
        🏀 NBA 5v5 Game Simulator
      </h1>

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

export default Home;
