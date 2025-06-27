import React, { useEffect, useRef } from 'react';

export default function GameLog({ gameLog }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameLog]);

  return (
    <div className="bg-secondary text-base p-4 rounded-xl max-h-64 sm:max-h-80 overflow-y-auto font-mono text-xs sm:text-sm shadow-inner border border-metallic/50 w-full">
      {gameLog.length === 0 ? (
        <p className="text-grayText italic">Game log will appear here...</p>
      ) : (
        <ul className="space-y-1">
          {gameLog.map((entry, idx) => (
            <li key={idx} className="text-primary break-words">{entry}</li>
          ))}
        </ul>
      )}
      <div ref={logEndRef} />
    </div>
  );
}
