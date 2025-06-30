import React from 'react';

// Reusable Stat Widget
function StatWidget({ label, value }) {
  return (
    <div className="p-3 bg-base text-secondary rounded-lg shadow-md w-28 text-center border border-metallic/30">
      <div className="text-xs font-semibold text-grayText">{label}</div>
      <div className="text-xl font-bold text-primary font-mono">{value}</div>
    </div>
  );
}

// Animated Momentum Arrows
function MomentumArrows({ momentum }) {
  const color = momentum > 0 ? 'text-green-400' : momentum < 0 ? 'text-red-400' : 'text-gray-400';
  const scale = Math.abs(momentum) + 1;

  return (
    <div
      className={`flex justify-center items-center space-x-1 ${color}`}
      style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease' }}
    >
      <span>↑</span>
      <span>↑</span>
      <span>↑</span>
    </div>
  );
}

// Win Probability Bar
function WinProbabilityChart({ probability }) {
  const percent = Math.round(probability * 100);
  return (
    <div className="w-full max-w-xs mx-auto p-3 bg-base text-secondary rounded-lg shadow-inner border border-metallic/30">
      <div className="text-sm font-semibold text-center mb-2">Win Probability</div>
      <div className="relative h-5 bg-metallic/30 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-center mt-1 font-mono text-primary">{percent}%</div>
    </div>
  );
}

// Main Live Stats Dashboard
export default function LiveStatsDashboard({ stats }) {
  return (
    <div className="bg-secondary p-6 rounded-xl shadow-gold space-y-6 max-w-md mx-auto font-display">
      <h2 className="text-xl font-bold text-primary text-center">Live Stats Preview</h2>

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
