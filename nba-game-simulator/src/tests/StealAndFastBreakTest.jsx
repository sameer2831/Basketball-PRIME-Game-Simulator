import { useEffect, useState } from 'react';
import players from '../data/top_100_elite_players.json';

export default function StealAndFastBreakTest() {
  const [logs, setLogs] = useState([]);
  const [offensivePlayer, setOffensivePlayer] = useState(null);
  const [defensivePlayer, setDefensivePlayer] = useState(null);

  const perMultiplier = 1; // adjust as needed
  const momentum = { team: 'Team B', streak: 4 };

  useEffect(() => {
    if (players.length < 2) return;
    const offense = players[0];
    const defense = players[1];
    setOffensivePlayer(offense);
    setDefensivePlayer(defense);
    simulatePlay(offense, defense);
  }, []);

  const addLog = (text) => setLogs((prev) => [...prev, text]);

  const updateStats = (playerName, stat, amount = 1) => {
    addLog(`📊 [Stat Updated] ${playerName}: ${stat} +${amount}`);
  };

  const getFatigueMultiplier = (player) => {
    const fatigue = 1.0; // placeholder
    addLog(`🌀 Fatigue Multiplier for ${player.Player}: ${fatigue.toFixed(2)}`);
    return fatigue;
  };

  const decideShotType = (player) => {
    const isThree = Math.random() < 0.35;
    const basePercentage = (player['TS%'] ?? player['FG%'] ?? 0.5);
    const zone = isThree ? '3PT' : 'Midrange/Paint';
    return {
      isThreePointer: isThree,
      basePercentage,
      points: isThree ? 3 : 2,
      zone,
    };
  };

  const simulatePlay = (offensive, defensive) => {
    addLog(`🔁 --- Simulation Start ---`);

    addLog(`🧍 Offensive Player: ${offensive.Player}`);
    addLog(`🛡️ Defensive Player: ${defensive.Player}`);

    const usg = offensive['USG%'] ?? 20;
    const tov = offensive['TOV%'] ?? 12;
    const stl = defensive['STL%'] ?? 1.5;

    const stealChance = (stl / 100) * (usg / 20) * (tov / 12) * perMultiplier;

    addLog(`📌 Raw Stats Used:`);
    addLog(`    USG%: ${usg}`);
    addLog(`    TOV%: ${tov}`);
    addLog(`    STL%: ${stl}`);
    addLog(`📈 Steal Chance: ${(stealChance * 100).toFixed(2)}%`);

    const stealHappened = Math.random() < stealChance;
    addLog(`🎲 Steal Roll: ${stealHappened ? "✅ Successful" : "❌ Failed"}`);

    if (!stealHappened) {
      addLog(`❌ No steal occurred. Possession continues.`);
      return;
    }

    addLog(`✅ ${defensive.Player} steals the ball from ${offensive.Player}!`);
    updateStats(defensive.Player, 'STL');
    updateStats(offensive.Player, 'TOV');

    const fastBreakChance = 0.5;
    const fbTriggered = Math.random() < fastBreakChance;

    addLog(`⚡ Fast Break Trigger Chance: 50% → ${fbTriggered ? "✅ Triggered" : "❌ Not Triggered"}`);
    if (!fbTriggered) return;

    const scorer = defensive;
    const fatigue = getFatigueMultiplier(scorer);
    const momentumBonus = momentum.team === 'Team B' && momentum.streak >= 3 ? 1.05 : 1;

    const { isThreePointer, basePercentage, points, zone } = decideShotType(scorer);

    const shotSuccessChance = basePercentage * fatigue * momentumBonus + 0.1;
    const fastBreakTurnoverChance = ((scorer['TOV%'] ?? 12) / 100) * (1 / fatigue);

    addLog(`📌 Fast Break Shot Details:`);
    addLog(`    Shot Zone: ${zone}`);
    addLog(`    Base TS%: ${(basePercentage * 100).toFixed(1)}%`);
    addLog(`    Fatigue Multiplier: ${fatigue}`);
    addLog(`    Momentum Bonus: ${momentumBonus}`);
    addLog(`    Final Shot Success Chance: ${(shotSuccessChance * 100).toFixed(2)}%`);
    addLog(`    Fast Break Turnover Chance: ${(fastBreakTurnoverChance * 100).toFixed(2)}%`);

    addLog(`🎯 ${scorer.Player} attempts a ${zone} fast break shot.`);

    if (Math.random() < fastBreakTurnoverChance) {
      addLog(`❌ Turnover on fast break by ${scorer.Player}`);
      updateStats(scorer.Player, 'TOV');
      return;
    }

    updateStats(scorer.Player, 'FGA');
    if (isThreePointer) updateStats(scorer.Player, '3PA');

    if (Math.random() < shotSuccessChance) {
      updateStats(scorer.Player, 'FGM');
      updateStats(scorer.Player, 'PTS', points);
      if (isThreePointer) updateStats(scorer.Player, '3PM');
      addLog(`✅ Fast break SUCCESS! ${scorer.Player} scores ${points} points.`);
    } else {
      addLog(`❌ Fast break missed by ${scorer.Player}.`);
    }
  };

  return (
    <div className="p-6 bg-black text-white font-mono">
      <h2 className="text-2xl font-bold mb-4 text-primary">🔍 Steal & Fast Break Debug</h2>
      {offensivePlayer && defensivePlayer && (
        <div className="mb-4 text-sm">
          Testing matchup: <span className="font-semibold">{defensivePlayer.Player}</span> guarding <span className="font-semibold">{offensivePlayer.Player}</span>
        </div>
      )}
      <div className="bg-gray-900 p-4 rounded-lg max-h-[500px] overflow-auto border border-yellow-400 text-sm">
        {logs.map((line, idx) => (
          <div key={idx} className="mb-1">→ {line}</div>
        ))}
      </div>
    </div>
  );
}
