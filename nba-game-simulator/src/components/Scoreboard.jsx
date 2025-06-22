import React from 'react';

export default function Scoreboard({ scoreA, scoreB }) {
  return (
    <div className="flex justify-center gap-12 my-6 text-2xl font-bold text-base">
      <div className="bg-primary text-secondary rounded-xl p-6 min-w-[160px] text-center shadow-gold">
        Team A
        <div className="text-5xl mt-2 font-extrabold">{scoreA}</div>
      </div>

      <div className="bg-base text-secondary rounded-xl p-6 min-w-[160px] text-center shadow-inner border border-grayText">
        Team B
        <div className="text-5xl mt-2 font-extrabold">{scoreB}</div>
      </div>
    </div>
  );
}
