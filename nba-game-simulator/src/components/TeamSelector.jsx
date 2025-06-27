import { useState, useMemo } from 'react';
import PlayerCard from './PlayerCard';

export default function TeamSelector({ players, selectedPlayers, onTeamChange, title,unavailablePlayers = [] }) {
  const [filterText, setFilterText] = useState('');
  const [filterPosition, setFilterPosition] = useState('All');

  function handleSelect(player) {
    const isAlreadySelected = selectedPlayers.find(p => p.Player === player.Player);
    if (isAlreadySelected) {
      const newSelection = selectedPlayers.filter(p => p.Player !== player.Player);
      onTeamChange(newSelection);
    } else {
      if (selectedPlayers.length < 5) {
        onTeamChange([...selectedPlayers, player]);
      }
    }
  }

  // Extract unique positions from players
  const positions = useMemo(() => {
    const posSet = new Set(players.map(p => p.Pos));
    return ['All', ...Array.from(posSet).sort()];
  }, [players]);

 
  // Filter and sort players by name and position
  const filteredPlayers = useMemo(() => {
     const unavailableNames = new Set(unavailablePlayers.map(p => p.Player));
  return players
    .filter(player => {
      const matchesName = player.Player.toLowerCase().includes(filterText.toLowerCase());
      const matchesPos = filterPosition === 'All' || player.Pos === filterPosition;
      const isUnavailable = unavailableNames.has(player.Player);
      return matchesName && matchesPos && !isUnavailable;
    })
    .sort((a, b) => a.Player.localeCompare(b.Player));
}, [players, filterText, filterPosition, unavailablePlayers]);
  return (
    <div className="bg-secondary rounded-xl p-6 shadow-lg border border-metallic flex flex-col">
      <h2 className="text-primary text-2xl font-display font-semibold mb-4">
        {title}{' '}
        <span className="text-base text-grayText font-normal">(Max 5 players)</span>
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter players by name..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          className="flex-1 p-2 rounded border border-metallic bg-base text-secondary placeholder-grayText font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={filterPosition}
          onChange={e => setFilterPosition(e.target.value)}
          className="p-2 rounded border border-metallic bg-base text-secondary font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {positions.map(pos => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-metallic scrollbar-track-secondary">
        {filteredPlayers.map(player => (
          <PlayerCard
            key={player.Player}
            player={player}
            onSelect={handleSelect}
            isSelected={selectedPlayers.some(p => p.Player === player.Player)}
          />
        ))}
      </div>

      <div className="bg-base rounded-lg p-4 border border-metallic shadow-inner">
        <h3 className="text-secondary font-display font-semibold mb-3">Selected Players</h3>
        {selectedPlayers.length === 0 ? (
          <p className="text-grayText italic">No players selected yet.</p>
        ) : (
          <ul className="list-disc list-inside text-secondary font-mono max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base">
            {selectedPlayers.map(p => (
              <li key={p.Player} className="py-0.5">
                <span className="font-semibold">{p.Player}</span> - <span>{p.Pos}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
