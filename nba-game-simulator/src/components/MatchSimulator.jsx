/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameControl from './GameControl';
import Scoreboard from './Scoreboard';
import GameLog from './GameLog';
import BoxScore from './BoxScore';

const positionShotPreferences = {
  PG: ['three', 'midRange', 'paint'],
  SG: ['three', 'midRange'],
  SF: ['midRange', 'three', 'paint'],
  PF: ['paint', 'midRange'],
  C: ['paint'],
};

const shotZones = {
  paint: { basePercentage: 0.6, points: 2 },
  midRange: { basePercentage: 0.45, points: 2 },
  three: { basePercentage: 0.35, points: 3 },
};

function decideShotType(player) {
  const pos = (player['Pos'] || 'G').toUpperCase();
  const zonePrefs = positionShotPreferences[pos] || ['midRange'];

  const rand = Math.random();
  let selectedZone = 'midRange';

  if (zonePrefs.includes('paint') && rand < 0.5) selectedZone = 'paint';
  else if (zonePrefs.includes('three') && rand < 0.8) selectedZone = 'three';

  const zone = shotZones[selectedZone];
  const playerZoneFG =
    selectedZone === 'three' ? player['3P%'] ?? zone.basePercentage :
    player['FG%'] ?? zone.basePercentage;

  return {
    isThreePointer: selectedZone === 'three',
    basePercentage: playerZoneFG,
    points: zone.points,
    zone: selectedZone,
  };
}

export default function MatchSimulator({ teamA = [], teamB = [] }) {
  // Removed scoreA and scoreB from state
  const [gameLog, setGameLog] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [quarterTimer, setQuarterTimer] = useState(720); // 12 minutes in seconds
  const [quarter, setQuarter] = useState(1);
  const fatigueMap = useRef({});
  const [momentum, setMomentum] = useState({ team: null, streak: 0 });
  const lastScorer = useRef(null);
  const [boxScore, setBoxScore] = useState({});

  // Helper function to calculate team points from boxScore
  const getTeamPoints = (boxScore, teamPrefix) => {
    return Object.entries(boxScore)
      .filter(([name]) => name.startsWith(teamPrefix))
      .reduce((total, [, stats]) => total + (stats.PTS || 0), 0);
  };

  // These are the scoreboard totals derived from boxScore
  const scoreA = getTeamPoints(boxScore, 'Team A');
  const scoreB = getTeamPoints(boxScore, 'Team B');

  const addLog = (msg) => setGameLog((prev) => [...prev, msg]);

  const applyAdvancedStats = (player, fatigue, momentumBoost) => {
    const trueShooting = player['TS%'] ?? player['FG%']; // fallback
    const turnoverRate = player['TOV%'] / 100 || 0.12;
    const assistRate = player['AST%'] / 100 || 0.1;
    const offensiveRebound = player['ORB%'] / 100 || 0.05;
    const defensiveRebound = player['DRB%'] / 100 || 0.1;
    const freeThrowRate = player['FTr'] || 0.25;
    const tsBoosted = trueShooting * fatigue * momentumBoost;

    return {
      shotSuccess: Math.random() < tsBoosted,
      turnover: Math.random() < turnoverRate,
      assistChance: Math.random() < assistRate,
      offensiveReboundChance: offensiveRebound,
      defensiveReboundChance: defensiveRebound,
      freeThrowAttempts: Math.random() < freeThrowRate ? 2 : 0,
    };
  };

  const resetGame = () => {
    setGameLog([]);
    setQuarter(1);
    setQuarterTimer(720);
    fatigueMap.current = {};
    lastScorer.current = null;
    setMomentum({ team: null, streak: 0 });
    setIsSimulating(false);
    const initBoxScore = {};
    teamA.forEach(player => {
      initBoxScore[`Team A - ${player.Player}`] = {
        PTS: 0, AST: 0, TRB: 0, STL: 0, BLK: 0, TOV: 0, PF: 0,
        FGM: 0, FGA: 0, '3PM': 0, '3PA': 0, FTM: 0, FTA: 0,
      };
    });
    teamB.forEach(player => {
      initBoxScore[`Team B - ${player.Player}`] = {
        PTS: 0, AST: 0, TRB: 0, STL: 0, BLK: 0, TOV: 0, PF: 0,
        FGM: 0, FGA: 0, '3PM': 0, '3PA': 0, FTM: 0, FTA: 0,
      };
    });
    setBoxScore(initBoxScore);
  };

  const updateStats = (playerName, stat, increment = 1) => {
    const prefix = teamA.some(p => p.Player === playerName) ? 'Team A - ' : 'Team B - ';
    const fullName = `${prefix}${playerName}`;

    setBoxScore(prev => ({
      ...prev,
      [fullName]: {
        ...(prev[fullName] || {}),
        [stat]: (prev[fullName]?.[stat] || 0) + increment
      }
    }));
  };

  const getFatigueMultiplier = (player) => {
    const minutes = fatigueMap.current[player.Player] || 0;
    if (minutes < 10) return 1.0;
    if (minutes < 20) return 0.95;
    if (minutes < 30) return 0.9;
    return 0.85;
  };

  const updateFatigue = (team) => {
    team.forEach(player => {
      fatigueMap.current[player.Player] = (fatigueMap.current[player.Player] || 0) + 0.5;
    });
  };

  // simulatePossession stays mostly the same, just remove setScore calls
const simulatePossession = (offenseTeam, defenseTeam, currentTeamName) => {
  let pointsScored = 0;

  const totalUsage = offenseTeam.reduce((sum, p) => sum + (p['USG%'] || 20), 0);
  const rand = Math.random() * totalUsage;
  let cumulative = 0;
  const offensivePlayer = offenseTeam.find(p => {
    cumulative += (p['USG%'] || 20);
    return rand <= cumulative;
  }) || offenseTeam[0];

  const potentialPassers = offenseTeam.filter(p => p.Player !== offensivePlayer.Player);
  const passer = potentialPassers.length > 0
    ? potentialPassers[Math.floor(Math.random() * potentialPassers.length)]
    : null;
  const defensivePlayer = defenseTeam[Math.floor(Math.random() * defenseTeam.length)];
  const fatigue = getFatigueMultiplier(offensivePlayer);
  const momentumBoost = momentum.team === currentTeamName && momentum.streak >= 3 ? 1.05 : 1;

  const {
    turnover,
    assistChance,
    freeThrowAttempts,
  } = applyAdvancedStats(offensivePlayer, fatigue, momentumBoost);

  const perMultiplier = (defensivePlayer['PER'] ?? 15) / 15;

  // === Refined Steal Logic ===
  const offensiveUsage = offensivePlayer['USG%'] ?? 20;
  const defenderStealRate = (defensivePlayer['STL%'] ?? 1.5) / 100;
  const turnoverRate = (offensivePlayer['TOV%'] ?? 12) / 100;
  const stealChance = defenderStealRate * (offensiveUsage / 20) * (turnoverRate / 0.12) * perMultiplier;

  if (Math.random() < stealChance) {
    addLog(`${currentTeamName}: ${defensivePlayer.Player} steals the ball from ${offensivePlayer.Player}!`);
    updateStats(defensivePlayer.Player, 'STL');
    updateStats(offensivePlayer.Player, 'TOV');

    const fastBreakChance = 0.5;
    if (Math.random() < fastBreakChance) {
      const fastBreakScorer = defenseTeam[Math.floor(Math.random() * defenseTeam.length)];
      const fbFatigue = getFatigueMultiplier(fastBreakScorer);
      const fbMomentum = momentum.team === (currentTeamName === 'Team A' ? 'Team B' : 'Team A') && momentum.streak >= 3 ? 1.05 : 1;
      const trueShooting = fastBreakScorer['TS%'] ?? fastBreakScorer['FG%'];
      const shotSuccessChance = trueShooting * fbFatigue * fbMomentum + 0.1;
      const fastBreakTurnoverChance = ((fastBreakScorer['TOV%'] ?? 12) / 100) * (1 / fbFatigue);

      const { isThreePointer, basePercentage, points, zone } = decideShotType(fastBreakScorer);

      addLog(`${currentTeamName === 'Team A' ? 'Team B' : 'Team A'}: ${fastBreakScorer.Player} attempts a fast break ${zone} shot.`);

      if (Math.random() < fastBreakTurnoverChance) {
        addLog(`  ⚡ Fast break blown! ${fastBreakScorer.Player} turns it over.`);
        updateStats(fastBreakScorer.Player, 'TOV');
        return 0;
      }

      updateStats(fastBreakScorer.Player, 'FGA');
      if (isThreePointer) updateStats(fastBreakScorer.Player, '3PA');

      if (Math.random() < shotSuccessChance) {
        updateStats(fastBreakScorer.Player, 'FGM');
        updateStats(fastBreakScorer.Player, 'PTS', points);
        if (isThreePointer) updateStats(fastBreakScorer.Player, '3PM');
        addLog(`  ⚡ Fast break! ${fastBreakScorer.Player} scores a ${points}-pointer!`);

        if (Math.random() < 0.5) {
          const trailer = defenseTeam.filter(p => p.Player !== fastBreakScorer.Player);
          if (trailer.length > 0) {
            const assistPlayer = trailer[Math.floor(Math.random() * trailer.length)];
            updateStats(assistPlayer.Player, 'AST');
            addLog(`    Assisted by ${assistPlayer.Player}`);
          }
        }
      } else {
        addLog(`  ⚡ Fast break missed by ${fastBreakScorer.Player}.`);
      }
      return 0;
    }

    return 0;
  }

  // === Turnover ===
  if (Math.random() < turnover) {
    addLog(`${currentTeamName}: ${offensivePlayer.Player} commits a turnover!`);
    updateStats(offensivePlayer.Player, 'TOV');
    return 0;
  }

  const { isThreePointer, basePercentage, points, zone } = decideShotType(offensivePlayer);
  addLog(`${currentTeamName}: ${offensivePlayer.Player} attempts a ${zone} shot.`);

  const shotSuccess = Math.random() < (basePercentage * fatigue * momentumBoost);

  updateStats(offensivePlayer.Player, 'FGA');
  if (isThreePointer) updateStats(offensivePlayer.Player, '3PA');

  if (shotSuccess) {
    updateStats(offensivePlayer.Player, 'FGM');
    if (isThreePointer) updateStats(offensivePlayer.Player, '3PM');
    updateStats(offensivePlayer.Player, 'PTS', points);
    pointsScored = points;
    addLog(`${currentTeamName}: ${offensivePlayer.Player} hits a ${points}-pointer! (+${points})`);

    if (passer && Math.random() < (passer['AST%'] ?? 15) / 100) {
      updateStats(passer.Player, 'AST');
      addLog(`  Assisted by ${passer.Player}.`);
    }

    lastScorer.current = currentTeamName;
    setMomentum(prev =>
      prev.team === currentTeamName
        ? { team: currentTeamName, streak: prev.streak + 1 }
        : { team: currentTeamName, streak: 1 }
    );
  } else {
    addLog(`${currentTeamName}: ${offensivePlayer.Player} misses a ${points}-pointer.`);

    // === Block Attempt ===
    const blkPct = (defensivePlayer['BLK%'] ?? 2) / 100;
    const oppFatigue = getFatigueMultiplier(offensivePlayer);
    const blockChance = blkPct * perMultiplier * (1 / oppFatigue);
    if (Math.random() < blockChance) {
      addLog(`  ${defensivePlayer.Player} blocks the shot!`);
      updateStats(defensivePlayer.Player, 'BLK');
    }

    // === Rebounding Battle ===
    const orbp = (offensivePlayer['ORB%'] ?? 5) / 100;
    const drbp = (defensivePlayer['DRB%'] ?? 15) / 100;
    const reboundRoll = Math.random();
    const reboundingContest = orbp / (orbp + drbp);

    if (reboundRoll < reboundingContest) {
      addLog(`  ${offensivePlayer.Player} grabs the offensive rebound!`);
      updateStats(offensivePlayer.Player, 'TRB');
    } else {
      addLog(`  ${defensivePlayer.Player} secures the defensive rebound.`);
      updateStats(defensivePlayer.Player, 'TRB');
    }

    // === Foul and Free Throws ===
    if (freeThrowAttempts > 0) {
      addLog(`  ${defensivePlayer.Player} fouls ${offensivePlayer.Player}.`);
      updateStats(defensivePlayer.Player, 'PF');
      updateStats(offensivePlayer.Player, 'FTA', freeThrowAttempts);
      let made = 0;
      for (let i = 0; i < freeThrowAttempts; i++) {
        if (Math.random() < offensivePlayer['FT%']) made++;
      }
      if (made > 0) {
        updateStats(offensivePlayer.Player, 'FTM', made);
        updateStats(offensivePlayer.Player, 'PTS', made);
        pointsScored += made;
        addLog(`  ${offensivePlayer.Player} makes ${made} free throw(s)! (+${made})`);
      } else {
        addLog(`  ${offensivePlayer.Player} misses both free throws.`);
      }
    }
  }

  return pointsScored;
};


  const simulateGame = async () => {
    if (teamA.length !== 5 || teamB.length !== 5) {
      addLog("Please assign 5 players to each team.");
      return;
    }

    resetGame();
    setIsSimulating(true);
    addLog("Game Started!");

    let currentPossessionTeam = Math.random() < 0.5 ? 'A' : 'B';

    for (let q = 1; q <= 4; q++) {
      setQuarter(q);
      setQuarterTimer(720);
      addLog(`--- Quarter ${q} Started ---`);

      for (let p = 0; p < 45; p++) {
        await new Promise(res => setTimeout(res, 100));
        if (currentPossessionTeam === 'A') {
          simulatePossession(teamA, teamB, 'Team A');
          currentPossessionTeam = 'B';
        } else {
          simulatePossession(teamB, teamA, 'Team B');
          currentPossessionTeam = 'A';
        }
        updateFatigue([...teamA, ...teamB]);
      }

      addLog(`--- Quarter ${q} Ended --- Score: A ${getTeamPoints(boxScore, 'Team A')} - B ${getTeamPoints(boxScore, 'Team B')}`);
    }

    addLog("--- Game Over ---");
    addLog(`Final: Team A ${getTeamPoints(boxScore, 'Team A')} - Team B ${getTeamPoints(boxScore, 'Team B')}`);
    setIsSimulating(false);
  };


  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quarter {quarter}</h2>
        <div className="font-mono text-lg">
          ⏱️ {Math.floor(quarterTimer / 60)}:{('0' + (quarterTimer % 60)).slice(-2)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${scoreA}-${scoreB}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-blue-100 p-4 rounded-lg shadow-md"
        >
          <Scoreboard scoreA={scoreA} scoreB={scoreB} />
        </motion.div>
      </AnimatePresence>
      <GameControl isSimulating={isSimulating} onStartGame={simulateGame} onResetGame={resetGame} />
      <GameLog gameLog={gameLog} />
      <BoxScore boxScore={boxScore} />
    </div>
  );
}
