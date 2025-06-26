import React, { useEffect, useState } from 'react';
import players from '../data/top_100_elite_players.json';

export default function PlayerDataAndReboundTest() {
  const [playerList, setPlayerList] = useState([]);
  const [reboundResult, setReboundResult] = useState(null);

  useEffect(() => {
    setPlayerList(players);

    if (players.length >= 2) {
      // Pick example offensive and defensive players
      const offensivePlayer = players[0]; // e.g. first player
      const defensivePlayer = players[1]; // second player

      // Get their ORB% and DRB% stats, fallback defaults used
      const orbp = (offensivePlayer['ORB%'] ?? 5) / 100;
      const drbp = (defensivePlayer['DRB%'] ?? 15) / 100;

      const reboundRoll = Math.random();
      const reboundingContest = orbp / (orbp + drbp);

      // Determine rebound winner
      const offensiveRebound = reboundRoll < reboundingContest;

      setReboundResult({
        offensivePlayer: offensivePlayer.Player,
        defensivePlayer: defensivePlayer.Player,
        orbp,
        drbp,
        reboundRoll: reboundRoll.toFixed(3),
        reboundingContest: reboundingContest.toFixed(3),
        offensiveRebound,
      });
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Player Data & Rebound Logic Test</h2>

      {playerList.length === 0 ? (
        <p>Loading player data...</p>
      ) : (
        <>
          <h3 className="mb-2">First 10 Players:</h3>
          <ul className="list-disc list-inside max-h-96 overflow-auto border p-4 rounded mb-6">
            {playerList.slice(0, 10).map((player, index) => (
              <li key={index}>
                <strong>{player.Player}</strong> — Team: {player.Team}, Pos: {player.Pos}, PER: {player.PER}
              </li>
            ))}
          </ul>

          {reboundResult ? (
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Rebound Test Result</h3>
              <p><strong>Offensive Player:</strong> {reboundResult.offensivePlayer} (ORB%: {(reboundResult.orbp * 100).toFixed(1)}%)</p>
              <p><strong>Defensive Player:</strong> {reboundResult.defensivePlayer} (DRB%: {(reboundResult.drbp * 100).toFixed(1)}%)</p>
              <p><strong>Rebounding Contest Probability:</strong> {reboundResult.reboundingContest}</p>
              <p><strong>Random Roll:</strong> {reboundResult.reboundRoll}</p>
              <p>
                <strong>Rebound Winner:</strong>{' '}
                {reboundResult.offensiveRebound ? 'Offensive Player gets the rebound' : 'Defensive Player gets the rebound'}
              </p>
            </div>
          ) : (
            <p>Insufficient player data for rebound test.</p>
          )}
        </>
      )}
    </div>
  );
}
