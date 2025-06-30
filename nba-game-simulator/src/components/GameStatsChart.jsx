import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function GameStatChart({ topA, topB }) {
  const data = [
    {
      name: topA.name.replace(/^Team A - /, ''),
      PTS: topA.stats.PTS,
      AST: topA.stats.AST,
      TRB: topA.stats.TRB,
    },
    {
      name: topB.name.replace(/^Team B - /, ''),
      PTS: topB.stats.PTS,
      AST: topB.stats.AST,
      TRB: topB.stats.TRB,
    },
  ];

  return (
    <div className="mt-2">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="PTS" fill="#1E90FF" name="Points" />
          <Bar dataKey="AST" fill="#00C49F" name="Assists" />
          <Bar dataKey="TRB" fill="#FFBB28" name="Rebounds" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
