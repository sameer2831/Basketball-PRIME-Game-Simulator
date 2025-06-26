// utils/permutationHelper.js
export function generateLineups(players) {
  const combinations = [];

  const backtrack = (start, path) => {
    if (path.length === 5) {
      combinations.push([...path]);
      return;
    }

    for (let i = start; i < players.length; i++) {
      path.push(players[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);
  return combinations;
}
