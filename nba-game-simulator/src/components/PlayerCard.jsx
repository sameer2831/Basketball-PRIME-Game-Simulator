import React from 'react';

export default function PlayerCard({ player, onSelect, isSelected }) {
  return (
    <div
      className={`p-4 rounded-md shadow-md cursor-pointer transition 
        border
        ${isSelected
          ? 'bg-primary text-secondary border-metallic scale-105'
          : 'bg-base text-secondary hover:bg-metallic/10 text-primary border-gray-300 hover:scale-105'}
        transform
        duration-300
        ease-in-out
      `}
      onClick={() => onSelect(player)}
    >
      <h3 className="font-bold text-lg font-display">{player.Player}</h3>
      <p className="text-sm text-grayText">
        {player.Pos} | {player.Team}
      </p>
      <p className="text-sm font-mono">
        PER: {player.PER?.toFixed(1)} | PTS: {player.PTS}
      </p>
    </div>
  );
}

