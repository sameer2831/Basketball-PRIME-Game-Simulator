import React from 'react';

export default function Scoreboard({
  scoreA,
  scoreB,
  quarterlyScoresA = [],
  quarterlyScoresB = [],
  currentQuarter,
}) {
  const totalPeriods = Math.max(quarterlyScoresA.length, quarterlyScoresB.length);
  const getLabel = (i) => (i < 4 ? `Q${i + 1}` : `OT${i - 3}`);

  return (
    <div className="flex flex-col items-center gap-6 my-6 px-4 w-full">
      {/* Main Score */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-2xl font-bold w-full">
        <div className="bg-primary text-secondary rounded-xl p-6 min-w-[140px] sm:min-w-[160px] text-center shadow-gold">
          Team A
          <div className="text-4xl sm:text-5xl mt-2 font-extrabold">{scoreA}</div>
        </div>

        <div className="bg-base text-secondary rounded-xl p-6 min-w-[140px] sm:min-w-[160px] text-center shadow-inner border border-grayText">
          Team B
          <div className="text-4xl sm:text-5xl mt-2 font-extrabold">{scoreB}</div>
        </div>
      </div>

      {/* Quarter Breakdown */}
      <div className="w-full overflow-x-auto">
        <div
          className="inline-grid gap-2 text-sm text-center min-w-max"
          style={{
            gridTemplateColumns: `100px repeat(${totalPeriods}, minmax(40px, 1fr))`,
          }}
        >
          {/* Header Row */}
          <div className="font-bold text-right pr-2">Quarter</div>
          {Array.from({ length: totalPeriods }).map((_, i) => (
            <div key={`q-head-${i}`} className="font-semibold">
              {getLabel(i)}
            </div>
          ))}

          {/* Team A Row */}
          <div className="text-right font-semibold text-primary pr-2">Team A</div>
          {Array.from({ length: totalPeriods }).map((_, i) => (
            <div
              key={`a-${i}`}
              className={`font-mono ${
                currentQuarter === i + 1 ? 'text-yellow-400 font-bold' : ''
              }`}
            >
              {quarterlyScoresA[i] ?? '-'}
            </div>
          ))}

          {/* Team B Row */}
          <div className="text-right font-semibold text-base pr-2">Team B</div>
          {Array.from({ length: totalPeriods }).map((_, i) => (
            <div
              key={`b-${i}`}
              className={`font-mono ${
                currentQuarter === i + 1 ? 'text-yellow-400 font-bold' : ''
              }`}
            >
              {quarterlyScoresB[i] ?? '-'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
