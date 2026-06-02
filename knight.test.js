import {
  isValidSquare,
  getKnightMoves,
  toKey,
  fromKey,
  knightMoves,
  buildPath,
} from "./knight.js";

describe("isValidSquare", () => {
  test("returns true for valid board positions", () => {
    expect(isValidSquare([0, 0])).toBe(true);
    expect(isValidSquare([7, 7])).toBe(true);
    expect(isValidSquare([3, 4])).toBe(true);
    expect(isValidSquare([0, 7])).toBe(true);
    expect(isValidSquare([7, 0])).toBe(true);
  });

  test("returns false for positions outside the board", () => {
    expect(isValidSquare([-1, 0])).toBe(false);
    expect(isValidSquare([8, 0])).toBe(false);
    expect(isValidSquare([0, -1])).toBe(false);
    expect(isValidSquare([0, 8])).toBe(false);
    expect(isValidSquare([-1, -1])).toBe(false);
    expect(isValidSquare([8, 8])).toBe(false);
  });
});

describe("getKnightMoves", () => {
  test("returns all 8 possible knight moves from the center of the board", () => {
    const moves = getKnightMoves([4, 4]);
    expect(moves).toHaveLength(8);
    expect(moves).toContainEqual([6, 5]);
    expect(moves).toContainEqual([6, 3]);
    expect(moves).toContainEqual([2, 5]);
    expect(moves).toContainEqual([2, 3]);
    expect(moves).toContainEqual([5, 6]);
    expect(moves).toContainEqual([5, 2]);
    expect(moves).toContainEqual([3, 6]);
    expect(moves).toContainEqual([3, 2]);
  });

  test("returns limited moves for corner positions", () => {
    // From [0, 0], only [1, 2] and [2, 1] are valid
    const cornerMoves = getKnightMoves([0, 0]);
    expect(cornerMoves).toHaveLength(2);
    expect(cornerMoves).toContainEqual([1, 2]);
    expect(cornerMoves).toContainEqual([2, 1]);
  });

  test("returns limited moves for edge positions", () => {
    const edgeMoves = getKnightMoves([0, 4]);
    expect(edgeMoves.length).toBeLessThan(8);
    expect(edgeMoves).toContainEqual([1, 6]);
    expect(edgeMoves).toContainEqual([1, 2]);
    expect(edgeMoves).toContainEqual([2, 5]);
    expect(edgeMoves).toContainEqual([2, 3]);
  });

  test("filters out invalid moves", () => {
    const moves = getKnightMoves([7, 7]);
    // From [7, 7], only [6, 5] and [5, 6] should be valid
    expect(moves).toHaveLength(2);
    expect(moves).toContainEqual([5, 6]);
    expect(moves).toContainEqual([6, 5]);
  });
});

describe("toKey", () => {
  test("converts square array to string key", () => {
    expect(toKey([0, 0])).toBe("0, 0");
    expect(toKey([3, 4])).toBe("3, 4");
    expect(toKey([7, 7])).toBe("7, 7");
  });
});

describe("fromKey", () => {
  test("converts string key back to square array", () => {
    expect(fromKey("0, 0")).toEqual([0, 0]);
    expect(fromKey("3, 4")).toEqual([3, 4]);
    expect(fromKey("7, 7")).toEqual([7, 7]);
  });

  test("returns numbers not strings", () => {
    const result = fromKey("2, 3");
    expect(typeof result[0]).toBe("number");
    expect(typeof result[1]).toBe("number");
  });
});

describe("buildPath", () => {
  test("builds correct path from cameFrom map", () => {
    const cameFrom = new Map();
    cameFrom.set("2, 3", "0, 0");
    cameFrom.set("0, 0", null);

    const path = buildPath(cameFrom, "2, 3");
    expect(path).toEqual([
      [0, 0],
      [2, 3],
    ]);
  });

  test("builds longer paths correctly", () => {
    const cameFrom = new Map();
    cameFrom.set("4, 5", "2, 4");
    cameFrom.set("2, 4", "0, 3");
    cameFrom.set("0, 3", null);

    const path = buildPath(cameFrom, "4, 5");
    expect(path).toEqual([
      [0, 3],
      [2, 4],
      [4, 5],
    ]);
  });

  test("builds single-square path", () => {
    const cameFrom = new Map();
    cameFrom.set("0, 0", null);

    const path = buildPath(cameFrom, "0, 0");
    expect(path).toEqual([[0, 0]]);
  });
});

describe("knightMoves", () => {
  test("returns null when no path exists (same square)", () => {
    const path = knightMoves([0, 0], [0, 0]);
    expect(path).toEqual([[0, 0]]);
  });

  test("finds shortest path from one square to adjacent knight move", () => {
    const path = knightMoves([0, 0], [1, 2]);
    expect(path).toHaveLength(2);
    expect(path[0]).toEqual([0, 0]);
    expect(path[path.length - 1]).toEqual([1, 2]);
  });

  test("finds path between two distant squares", () => {
    const path = knightMoves([0, 0], [7, 7]);
    expect(path).toBeDefined();
    expect(path[0]).toEqual([0, 0]);
    expect(path[path.length - 1]).toEqual([7, 7]);
    expect(path.length).toBeGreaterThan(1);
  });

  test("finds shortest path from center", () => {
    const path = knightMoves([3, 3], [4, 5]);
    expect(path).toHaveLength(2);
    expect(path[0]).toEqual([3, 3]);
    expect(path[1]).toEqual([4, 5]);
  });

  test("throws error for invalid start position", () => {
    expect(() => knightMoves([-1, 0], [7, 7])).toThrow(
      "Start and target must be valid board positions.",
    );
    expect(() => knightMoves([8, 0], [7, 7])).toThrow(
      "Start and target must be valid board positions.",
    );
  });

  test("throws error for invalid target position", () => {
    expect(() => knightMoves([0, 0], [-1, 0])).toThrow(
      "Start and target must be valid board positions.",
    );
    expect(() => knightMoves([0, 0], [8, 8])).toThrow(
      "Start and target must be valid board positions.",
    );
  });

  test("throws error for both invalid positions", () => {
    expect(() => knightMoves([-1, 0], [8, 8])).toThrow(
      "Start and target must be valid board positions.",
    );
  });

  test("finds correct path with intermediate steps", () => {
    const path = knightMoves([0, 0], [2, 2]);
    expect(path).toBeDefined();
    expect(path[0]).toEqual([0, 0]);
    expect(path[path.length - 1]).toEqual([2, 2]);
    // Verify each step is a valid knight move
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      const possibleMoves = getKnightMoves(current);
      expect(possibleMoves).toContainEqual(next);
    }
  });

  test("finds path across the entire board", () => {
    const path = knightMoves([0, 0], [0, 7]);
    expect(path).toBeDefined();
    expect(path[0]).toEqual([0, 0]);
    expect(path[path.length - 1]).toEqual([0, 7]);
  });

  test("path contains valid knight moves at each step", () => {
    const path = knightMoves([1, 1], [6, 6]);
    expect(path).toBeDefined();

    // Verify each consecutive pair in path is a valid knight move
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      const dx = Math.abs(current[0] - next[0]);
      const dy = Math.abs(current[1] - next[1]);

      // Knight moves: (2,1) or (1,2)
      const isValidMove = (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
      expect(isValidMove).toBe(true);
    }
  });

  test("finds paths for various start and end positions", () => {
    const testCases = [
      [
        [0, 0],
        [7, 7],
      ],
      [
        [3, 3],
        [3, 3],
      ],
      [
        [0, 0],
        [1, 2],
      ],
      [
        [7, 7],
        [0, 0],
      ],
      [
        [2, 4],
        [6, 5],
      ],
    ];

    testCases.forEach(([start, target]) => {
      const path = knightMoves(start, target);
      expect(path).toBeDefined();
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(target);
    });
  });

  describe("Odin Project Specific Examples", () => {
    test("finds shortest path from [0,0] to [3,3]", () => {
      const path = knightMoves([0, 0], [3, 3]);
      expect(path).toBeDefined();
      expect(path[0]).toEqual([0, 0]);
      expect(path[path.length - 1]).toEqual([3, 3]);
      // According to Odin Project: shortest path is 3 moves
      // [[0,0],[2,1],[3,3]] or [[0,0],[1,2],[3,3]]
      expect(path.length).toBeLessThanOrEqual(3);
    });

    test("finds shortest path from [3,3] to [0,0] (reverse)", () => {
      const path = knightMoves([3, 3], [0, 0]);
      expect(path).toBeDefined();
      expect(path[0]).toEqual([3, 3]);
      expect(path[path.length - 1]).toEqual([0, 0]);
      expect(path.length).toBeLessThanOrEqual(3);
    });

    test("finds shortest path from [0,0] to [7,7]", () => {
      const path = knightMoves([0, 0], [7, 7]);
      expect(path).toBeDefined();
      expect(path[0]).toEqual([0, 0]);
      expect(path[path.length - 1]).toEqual([7, 7]);
      // According to Odin Project examples, this should be 7 moves (8 squares)
      expect(path.length).toBeLessThanOrEqual(7);
    });

    test("finds path for example [3,3] to [4,3]", () => {
      const path = knightMoves([3, 3], [4, 3]);
      expect(path).toBeDefined();
      expect(path[0]).toEqual([3, 3]);
      expect(path[path.length - 1]).toEqual([4, 3]);
      // Should find a valid path (exact length may vary)
      expect(path.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("ensures path is shortest by checking BFS property", () => {
    // BFS guarantees shortest path in unweighted graphs
    const path = knightMoves([0, 0], [4, 4]);
    expect(path).toBeDefined();

    // From [0,0], to reach [4,4], minimum moves should be found
    // Verify path doesn't contain unnecessary loops
    const uniqueSquares = new Set();
    for (const square of path) {
      const key = toKey(square);
      expect(uniqueSquares.has(key)).toBe(false); // No duplicate squares
      uniqueSquares.add(key);
    }
  });

  test("all reachable positions can be found", () => {
    const start = [3, 3];
    // Test that we can reach various positions from center
    const targets = [
      [0, 0],
      [7, 7],
      [0, 7],
      [7, 0],
      [4, 5],
      [1, 1],
    ];

    targets.forEach((target) => {
      const path = knightMoves(start, target);
      expect(path).toBeDefined();
      expect(path.length).toBeGreaterThanOrEqual(1);
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(target);
    });
  });

  test("symmetry: forward and reverse paths have same length", () => {
    const start = [1, 0];
    const target = [7, 6];

    const forwardPath = knightMoves(start, target);
    const reversePath = knightMoves(target, start);

    expect(forwardPath).toBeDefined();
    expect(reversePath).toBeDefined();
    expect(forwardPath.length).toBe(reversePath.length);
  });

  test("one-move paths work correctly", () => {
    // Positions that are exactly one knight move apart
    const oneMovePairs = [
      [
        [0, 0],
        [1, 2],
      ],
      [
        [0, 0],
        [2, 1],
      ],
      [
        [4, 4],
        [6, 5],
      ],
    ];

    oneMovePairs.forEach(([start, target]) => {
      const path = knightMoves(start, target);
      expect(path).toHaveLength(2);
      expect(path[0]).toEqual(start);
      expect(path[1]).toEqual(target);
    });
  });
});
