export default function BoxScore({ boxScore }) {
  if (!boxScore || Object.keys(boxScore).length === 0) {
    return <div className="text-grayText italic">Box score will appear here...</div>;
  }

  const statHeaders = [
    'PTS', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF'
  ];

  const teamAPlayers = Object.entries(boxScore).filter(([name]) => name.startsWith('Team A'));
  const teamBPlayers = Object.entries(boxScore).filter(([name]) => name.startsWith('Team B'));

  const calculateTotals = (players) => {
    const totals = {};
    players.forEach(([, stats]) => {
      for (let key in stats) {
        totals[key] = (totals[key] || 0) + stats[key];
      }
    });
    totals['FG%'] = totals.FGA ? ((totals.FGM / totals.FGA) * 100).toFixed(1) + '%' : '0%';
    totals['3P%'] = totals['3PA'] ? ((totals['3PM'] / totals['3PA']) * 100).toFixed(1) + '%' : '0%';
    totals['FT%'] = totals.FTA ? ((totals.FTM / totals.FTA) * 100).toFixed(1) + '%' : '0%';
    return totals;
  };

  const renderTeamSection = (teamName, players) => {
    const totals = calculateTotals(players);

    return (
      <div className="mb-10">
        <h3 className="text-xl sm:text-2xl font-bold text-primary font-display mb-3">{teamName}</h3>

        <div className="overflow-x-auto rounded-lg shadow-gold">
          <table className="min-w-full text-xs sm:text-sm text-center bg-secondary text-base font-mono border-collapse">
            <thead className="bg-metallic text-secondary uppercase">
              <tr>
                <th className="px-3 py-2 text-left sticky left-0 bg-metallic">Player</th>
                {statHeaders.map(header => (
                  <th key={header} className="px-2 py-2 whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map(([name, stats]) => {
                const displayName = name.replace(/^Team [AB] - /, '');
                return (
                  <tr key={name} className="border-b border-metallic/30 hover:bg-metallic/10">
                    <td className="px-3 py-2 text-left font-semibold sticky left-0 bg-secondary">{displayName}</td>
                    {statHeaders.map(stat => {
                      if (stat === 'FG%')
                        return <td key={stat}>{stats.FGA ? ((stats.FGM / stats.FGA) * 100).toFixed(1) + '%' : '0%'}</td>;
                      if (stat === '3P%')
                        return <td key={stat}>{stats['3PA'] ? ((stats['3PM'] / stats['3PA']) * 100).toFixed(1) + '%' : '0%'}</td>;
                      if (stat === 'FT%')
                        return <td key={stat}>{stats.FTA ? ((stats.FTM / stats.FTA) * 100).toFixed(1) + '%' : '0%'}</td>;
                      return <td key={stat}>{stats[stat] ?? 0}</td>;
                    })}
                  </tr>
                );
              })}
              <tr className="bg-base text-secondary font-bold border-t border-metallic">
                <td className="text-left px-3 py-2 sticky left-0 bg-base">Total</td>
                {statHeaders.map(stat => (
                  <td key={stat}>{totals[stat] ?? 0}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10 space-y-12 px-4 w-full">
      {renderTeamSection("Team A", teamAPlayers)}
      {renderTeamSection("Team B", teamBPlayers)}
    </div>
  );
}
