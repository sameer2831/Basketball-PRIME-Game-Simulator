/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameControl from './GameControl';
import Scoreboard from './Scoreboard';
import GameLog from './GameLog';
import BoxScore from './BoxScore';
import GameStatChart from './GameStatsChart';
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
    selectedZone === 'three' ? player['3P%'] ?? zone.basePercentage : player['FG%'] ?? zone.basePercentage;

  return {
    isThreePointer: selectedZone === 'three',
    basePercentage: playerZoneFG,
    points: zone.points,
    zone: selectedZone,
  };
}

export default function MatchSimulator({ teamA = [], teamB = [] }) {
  const [gameLog, setGameLog] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [quarterTimer, setQuarterTimer] = useState(720);
  const [quarter, setQuarter] = useState(1);
  const [momentum, setMomentum] = useState({ team: null, streak: 0 });
  const fatigueMap = useRef({});
  const lastScorer = useRef(null);
  const [mode, setMode] = useState('single'); // 'single' or 'series'
  const [seriesResults, setSeriesResults] = useState([]);
  const [singleGameSummary, setSingleGameSummary] = useState(null);
  const clearSeries = () => {
  setSeriesResults([]);
  setSeriesMVP(null); 
  addLog("--- Series Log Cleared ---");
};
  const [seriesMVP, setSeriesMVP] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [boxScore, setBoxScore] = useState({});
  const boxScoreRef = useRef({});
  const setAndMirrorBoxScore = (updaterFn) => {
    setBoxScore(prev => {
      const updated = updaterFn(prev);
      boxScoreRef.current = updated;
      return updated;
    });
  };

  const getTeamPoints = (source, teamPrefix) => {
    return Object.entries(source)
      .filter(([name]) => name.startsWith(teamPrefix))
      .reduce((total, [, stats]) => total + (stats.PTS || 0), 0);
  };

 const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  useEffect(() => {
    setScoreA(getTeamPoints(boxScore, 'Team A'));
    setScoreB(getTeamPoints(boxScore, 'Team B'));
  }, [boxScore]);


  const addLog = (msg) => setGameLog(prev => [...prev, msg]);

  const updateStats = (playerName, stat, increment = 1) => {
    const prefix = teamA.some(p => p.Player === playerName) ? 'Team A - ' : 'Team B - ';
    const fullName = `${prefix}${playerName}`;
    setAndMirrorBoxScore(prev => ({
      ...prev,
      [fullName]: {
        ...(prev[fullName] || {}),
        [stat]: (prev[fullName]?.[stat] || 0) + increment
      }
    }));
  };

  const [quarterlyScores, setQuarterlyScores] = useState({
  A: [],
  B: [],
});

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
    setQuarterlyScores({ A: [], B: [] });
    fatigueMap.current = {};
    lastScorer.current = null;
    setMomentum({ team: null, streak: 0 });
    setIsSimulating(false);
    setSingleGameSummary(null);
    const initBoxScore = {};
    teamA.forEach(player => {
      initBoxScore[`Team A - ${player.Player}`] = { PTS: 0, AST: 0, TRB: 0, STL: 0, BLK: 0, TOV: 0, PF: 0, FGM: 0, FGA: 0, '3PM': 0, '3PA': 0, FTM: 0, FTA: 0 };
    });
    teamB.forEach(player => {
      initBoxScore[`Team B - ${player.Player}`] = { PTS: 0, AST: 0, TRB: 0, STL: 0, BLK: 0, TOV: 0, PF: 0, FGM: 0, FGA: 0, '3PM': 0, '3PA': 0, FTM: 0, FTA: 0 };
    });
    setAndMirrorBoxScore(() => initBoxScore);

  };

  // const updateStats = (playerName, stat, increment = 1) => {
  //   const prefix = teamA.some(p => p.Player === playerName) ? 'Team A - ' : 'Team B - ';
  //   const fullName = `${prefix}${playerName}`;

  //   setBoxScore(prev => ({
  //     ...prev,
  //     [fullName]: {
  //       ...(prev[fullName] || {}),
  //       [stat]: (prev[fullName]?.[stat] || 0) + increment
  //     }
  //   }));
  // }; 

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

const getTopPerformer = (teamPrefix) => {
  const players = Object.entries(boxScoreRef.current)
    .filter(([name]) => name.startsWith(teamPrefix));
    
  let topPlayer = null;
  let topScore = -Infinity;

  for (const [name, stats] of players) {
    const perfScore = (stats.PTS || 0) + (stats.TRB || 0) + (stats.AST || 0) + 
                      (stats.STL || 0) + (stats.BLK || 0) - (stats.TOV || 0);
    if (perfScore > topScore) {
      topScore = perfScore;
      topPlayer = { name, stats, perfScore };
    }
  }
  return topPlayer;
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
      setQuarterlyScores(prev => ({
      A: [...prev.A, getTeamPoints(boxScoreRef.current, 'Team A') - (prev.A.reduce((a, b) => a + b, 0) || 0)],
      B: [...prev.B, getTeamPoints(boxScoreRef.current, 'Team B') - (prev.B.reduce((a, b) => a + b, 0) || 0)],
    }));
      addLog(`--- Quarter ${q} Ended --- Score: A ${getTeamPoints(boxScoreRef.current, 'Team A')} - B ${getTeamPoints(boxScoreRef.current, 'Team B')}`);
    }
    let overtimeCount = 0;
  while (getTeamPoints(boxScoreRef.current, 'Team A') === getTeamPoints(boxScoreRef.current, 'Team B')) {
    overtimeCount++;
    setQuarter(4 + overtimeCount);
    setQuarterTimer(300); // 5 min overtime or simulate N possessions
    addLog(`--- Overtime ${overtimeCount} Started ---`);
    for (let p = 0; p < 15; p++) {
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
    setQuarterlyScores(prev => ({
      A: [...prev.A, getTeamPoints(boxScoreRef.current, 'Team A') - (prev.A.reduce((a, b) => a + b, 0) || 0)],
      B: [...prev.B, getTeamPoints(boxScoreRef.current, 'Team B') - (prev.B.reduce((a, b) => a + b, 0) || 0)],
    }));
    addLog(`--- Overtime ${overtimeCount} Ended --- Score: A ${getTeamPoints(boxScoreRef.current, 'Team A')} - B ${getTeamPoints(boxScoreRef.current, 'Team B')}`);
  }

    const finalScoreA = getTeamPoints(boxScoreRef.current, 'Team A');
    const finalScoreB = getTeamPoints(boxScoreRef.current, 'Team B');

    addLog("--- Game Over ---");
    addLog(`Final: Team A ${finalScoreA} - Team B ${finalScoreB}`);

    setIsSimulating(false);
    //return finalScoreA > finalScoreB ? 'A' : 'B';
    const gameSummary = {
      winner: finalScoreA > finalScoreB ? 'A' : 'B',
      scoreA: finalScoreA,
      scoreB: finalScoreB,
      topA: getTopPerformer('Team A'),
      topB: getTopPerformer('Team B'),
    };
    setSingleGameSummary(gameSummary); 
    return gameSummary;

  };

const simulateSeries = async () => {
  const results = []; // Local array for reliable accumulation
  let winsA = 0;
  let winsB = 0;
  let gameNumber = 1;

  setSeriesResults([]); // Clear state display

  while (winsA < 4 && winsB < 4) {
    addLog(`=== Game ${gameNumber} of the Series ===`);
    const gameSummary = await simulateGame();
    const { winner, scoreA, scoreB, topA, topB } = gameSummary;

    if (winner === 'A') winsA++;
    else winsB++;

    results.push({ game: gameNumber, winner, scoreA, scoreB, topA, topB });
     const newGameResult = {
    game: gameNumber,
    winner,
    scoreA,
    scoreB,
    topA,
    topB,
  };

  setSeriesResults(prev => [...prev, newGameResult]);

    addLog(`Series Score: Team A ${winsA} - Team B ${winsB}`);
    await new Promise(res => setTimeout(res, 1500));
    gameNumber++;
  }

  //setSeriesResults(results); // Now update state in one go

  addLog(`=== Series Over ===`);
  addLog(`Winner: ${winsA > winsB ? 'Team A' : 'Team B'} (${winsA}-${winsB})`);

  const playerPerformances = {};

  results.forEach(({ topA, topB }) => {
    [topA, topB].forEach(({ name, perfScore }) => {
      if (!playerPerformances[name]) playerPerformances[name] = 0;
      playerPerformances[name] += perfScore;
    });
  });

  const seriesMVP = Object.entries(playerPerformances).sort((a, b) => b[1] - a[1])[0];
  setSeriesMVP(seriesMVP); 
  addLog(`🏆 Series MVP: ${seriesMVP[0]} (${seriesMVP[1]} performance points)`);
};


  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 items-center mb-4">
        <label>
          <input
            type="radio"
            name="mode"
            value="single"
            checked={mode === 'single'}
            onChange={() => setMode('single')}
          /> Single Game
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="series"
            checked={mode === 'series'}
            disabled={isSimulating}
            onChange={() => setMode('series')}
          /> Best-of-7 Series
        </label>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quarter {quarter}</h2>
        <div className="font-mono text-lg">
          ⏱️ {Math.floor(quarterTimer / 60)}:{('0' + (quarterTimer % 60)).slice(-2)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        
          <Scoreboard
          scoreA={scoreA}
          scoreB={scoreB}
          quarterlyScoresA={quarterlyScores.A}
          quarterlyScoresB={quarterlyScores.B}
          currentQuarter={quarter}
        />
        
      </AnimatePresence>
      <GameControl
        isSimulating={isSimulating}
        onStartGame={() => {
          if (mode === 'series') simulateSeries();
          else simulateGame();
        }}
        onResetGame={resetGame}
      />
      <GameLog gameLog={gameLog} />
      {mode === 'single' && singleGameSummary && (
  <div className="bg-white rounded-lg shadow p-4 border border-gray-300">
    <div className="text-lg text-secondary font-semibold mb-1">
      🏁 Single Game Result: <span className="text-blue-700">Team {singleGameSummary.winner} wins</span>
    </div>
    <div className="mb-2 text-secondary">Final Score — <strong>Team A:</strong> {singleGameSummary.scoreA} | <strong>Team B:</strong> {singleGameSummary.scoreB}</div>
    <div className="flex justify-between text-sm text-secondary">
      <ul className="space-y-2">
        <div>
          🔥 <strong>{singleGameSummary.topA.name}</strong> — {singleGameSummary.topA.stats.PTS} pts, {singleGameSummary.topA.stats.AST} ast, {singleGameSummary.topA.stats.TRB} trb, {singleGameSummary.topA.stats.STL} stl, {singleGameSummary.topA.stats.BLK} blk
        </div>
        <div>
          🔥 <strong>{singleGameSummary.topB.name}</strong> — {singleGameSummary.topB.stats.PTS} pts, {singleGameSummary.topB.stats.AST} ast, {singleGameSummary.topB.stats.TRB} trb, {singleGameSummary.topB.stats.STL} stl, {singleGameSummary.topB.stats.BLK} blk
        </div>
      </ul>
    </div>
    <GameStatChart topA={singleGameSummary.topA} topB={singleGameSummary.topB} />
  </div>
)}
{mode === 'series' && seriesResults.length > 0 && (
  <div className="bg-gray-300 p-4 text-secondary rounded shadow">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-lg text-secondary mb-2">Series Progress</h3>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        onClick={clearSeries}
      >
        Clear Series
      </button>
    </div>

    {/* === Series Counter === */}
    <div className="text-md font-semibold mb-4">
      Series Score: 🟠 Team A - Team B 🔵 ({seriesResults.filter(g => g.winner === 'A').length} -  {seriesResults.filter(g => g.winner === 'B').length})
    </div>

    {/* === Per Game Summary === */}
    <ul className="space-y-4">
      {seriesResults.map(({ game, winner, scoreA, scoreB, topA, topB }) => (
        <li key={game} className="bg-white rounded-lg shadow p-4 border border-gray-300">
          <div className="text-lg font-semibold mb-1">
            Game {game}: <span className="text-blue-700">Team {winner} wins</span>
          </div>
          <div className="mb-2">
            Final Score — <strong>Team A:</strong> {scoreA} | <strong>Team B:</strong> {scoreB}
          </div>
          <div className="space-y-1 text-sm">
            <div>
              🔥 <strong>{topA.name}</strong> — {topA.stats.PTS} pts, {topA.stats.AST} ast, {topA.stats.TRB} trb, {topA.stats.STL} stl, {topA.stats.BLK} blk
            </div>
            <div>
              🔥 <strong>{topB.name}</strong> — {topB.stats.PTS} pts, {topB.stats.AST} ast, {topB.stats.TRB} trb, {topB.stats.STL} stl, {topB.stats.BLK} blk
            </div>
          </div>
          
      <button
        onClick={() => setShowChart(prev => !prev)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>

      {showChart && (
        <div className="mt-3">
          <GameStatChart topA={topA} topB={topB} />
        </div>
      )}
        </li>
      ))}
    </ul>

    {/* === MVP Shown Only When Series Ends === */}
    {seriesResults.length >= 4 && ( // could check for 4 wins instead
      <div className="mt-4 font-bold">
        🏆 Series MVP: {seriesMVP?.[0]} (Score: {seriesMVP?.[1]})
      </div>
    )}
  </div>
)}

      <BoxScore boxScore={boxScore} />
    </div>
  );
}
