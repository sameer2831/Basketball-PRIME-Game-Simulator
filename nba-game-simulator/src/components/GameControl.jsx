export default function GameControl({ isSimulating, onStartGame, onResetGame, mode }) {
  return (
    <div className="flex justify-center gap-4 my-6">
      <button
        onClick={onStartGame}
        disabled={isSimulating}
        className={`px-6 py-2 rounded-lg font-semibold transition duration-200 shadow-gold ${
          isSimulating
            ? 'bg-gray-400 text-base cursor-not-allowed'
            : 'bg-primary text-secondary hover:bg-metallic'
        }`}
      >
        {isSimulating
          ? 'Simulating...'
          : mode === 'series'
          ? 'Start Series'
          : 'Start Game'}
      </button>

      <button
        onClick={onResetGame}
        disabled={isSimulating}
        className={`px-6 py-2 rounded-lg font-semibold transition duration-200 shadow-gold ${
          isSimulating
            ? 'bg-gray-400 text-base cursor-not-allowed'
            : 'bg-secondary text-base hover:bg-gray-800'
        }`}
      >
        Reset
      </button>
    </div>
  );
}
