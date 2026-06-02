const isValidSquare = (square) => {
  const [x, y] = square;

  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
};

const getKnightMoves = (square) => {
  const [x, y] = square;

  const possibleMoves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
  ];

  return possibleMoves.filter(isValidSquare);
};

const toKey = (square) => {
  return `${square[0]}, ${square[1]}`;
};

const fromKey = (key) => {
  return key.split(",").map(Number);
};

const knightMoves = (start, target) => {
  if (!isValidSquare(start) || !isValidSquare(target)) {
    throw new Error("Start and target must be valid board positions.");
  }

  const startKey = toKey(start);
  const targetKey = toKey(target);

  const queue = [start];
  const visited = new Set([startKey]);

  // child square -> parent square
  const cameFrom = new Map();
  cameFrom.set(startKey, null);

  let front = 0;

  while (front < queue.length) {
    const current = queue[front];
    front++;

    const currentKey = toKey(current);

    if (currentKey === targetKey) {
      return buildPath(cameFrom, targetKey);
    }

    const neighbors = getKnightMoves(current);

    for (const neighbor of neighbors) {
      const neighborKey = toKey(neighbor);

      if (visited.has(neighborKey)) {
        continue;
      }

      visited.add(neighborKey);
      cameFrom.set(neighborKey, currentKey);
      queue.push(neighbor);
    }
  }

  return null;
};

const buildPath = (cameFrom, targetKey) => {
  const path = [];
  let currentKey = targetKey;

  while (currentKey !== null) {
    path.push(fromKey(currentKey));
    currentKey = cameFrom.get(currentKey);
  }

  return path.reverse();
};

export {
  isValidSquare,
  getKnightMoves,
  toKey,
  fromKey,
  knightMoves,
  buildPath,
};
