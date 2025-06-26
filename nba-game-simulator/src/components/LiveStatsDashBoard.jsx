import React from 'react';

// Example stat widget component
function StatWidget({ label, value }) {
  return (
    <div className="p-2 m-1 bg-gray-200 rounded shadow text-center w-28">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

// Example momentum arrows
function MomentumArrows({ momentum }) {
  // momentum: number (-1 to 1) for negative to positive momentum
  const arrowStyle = {
    color: momentum > 0 ? 'green' : momentum < 0 ? 'red' : 'gray',
    transform: `scale(${Math.abs(momentum) + 1})`,
    transition: 'transform 0.5s ease',
  };
  return (
    <div className="flex justify-center items-center space-x-2">
      <span style={arrowStyle}>&uarr;</span>
      <span style={arrowStyle}>&uarr;</span>
      <span style={arrowStyle}>&uarr;</span>
    </div>
  );
}

// Placeholder Win Probability Chart (replace with real chart lib)
function WinProbabilityChart({ probability }) {
  const percent = Math.round(probability * 100);
  return (
    <div className="w-full max-w-xs mx-auto p-2 bg-white rounded shadow">
      <div className="text-center mb-2 font-semibold">Win Probability</div>
      <div className="relative h-6 bg-gray-300 rounded">
        <div
          className="absolute top-0 left-0 h-6 bg-blue-500 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-center mt-1">{percent}%</div>
    </div>
  );
}

export default function LiveStatsDashboard({ stats }) {
  // stats = { teamAPer, teamAFgPct, momentum, winProb }

  return (
    <div className="p-4 bg-gray-100 rounded shadow space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Live Stats Preview</h2>
      <div className="flex justify-around">
        <StatWidget label="Team A PER" value={stats.teamAPer.toFixed(1)} />
        <StatWidget label="Team A FG%" value={`${(stats.teamAFgPct * 100).toFixed(1)}%`} />
      </div>
      <div className="text-center">
        <MomentumArrows momentum={stats.momentum} />
      </div>
      <WinProbabilityChart probability={stats.winProb} />
    </div>
  );
}
