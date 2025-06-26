import React from 'react';

export default function DemoTeamSelector({ allPlayers, teamA, setTeamA, teamB, setTeamB }) {
  const togglePlayer = (player, team, setTeam) => {
    if (team.includes(player)) {
      setTeam(team.filter(p => p !== player));
    } else {
      setTeam([...team, player]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-2">Select Team A</h3>
        <div className="flex flex-wrap gap-2">
          {allPlayers.map(player => (
            <button
              key={`a-${player}`}
              onClick={() => togglePlayer(player, teamA, setTeamA)}
              className={`px-3 py-1 rounded-full border ${
                teamA.includes(player) ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {player}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">Select Team B</h3>
        <div className="flex flex-wrap gap-2">
          {allPlayers.map(player => (
            <button
              key={`b-${player}`}
              onClick={() => togglePlayer(player, teamB, setTeamB)}
              className={`px-3 py-1 rounded-full border ${
                teamB.includes(player) ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}
            >
              {player}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
