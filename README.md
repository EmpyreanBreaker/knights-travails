# Knights Travails

A The Odin Project assignment implementing a shortest path solver for a chess knight on an 8x8 board using breadth-first search (BFS).

## Project Overview

In this project, you build a function `knightMoves` that finds the shortest possible path for a knight to move from one square to another on a standard 8x8 chessboard. A knight moves in an L-shape: two squares in one direction and one square perpendicular to that, or one square in one direction and two squares perpendicular.

The problem models the chessboard as a graph where:

- **Vertices** are the 64 squares on the board, represented as coordinates `[x, y]` where x and y range from 0 to 7
- **Edges** are valid knight moves between vertices
- The goal is to find the shortest path between any two vertices using BFS

## Key Concepts

### Graph Representation

The chessboard is an **implicit graph** - you don't need to create an explicit graph object with all vertices and edges. Instead:

- Each square is a node
- Valid knight moves from a square represent edges to neighboring nodes
- The algorithm dynamically explores moves as it traverses

### Breadth-First Search (BFS)

BFS is ideal for finding the shortest path in an unweighted graph:

1. Use a queue to track positions to explore
2. Track visited positions to avoid loops
3. Store parent pointers to reconstruct the path
4. Explore level-by-level to guarantee the shortest path

### Knight Movement

A knight can make up to 8 different moves from any position:

```
[x+2, y+1]  [x+2, y-1]
[x+1, y+2]  [x+1, y-2]
[x-1, y+2]  [x-1, y-2]
[x-2, y+1]  [x-2, y-1]
```

## API

### `knightMoves(start, target)`

Finds the shortest path for a knight to move from `start` to `target`.

**Parameters:**

- `start` - Array `[x, y]` representing the starting square (0-7 for each coordinate)
- `target` - Array `[x, y]` representing the target square (0-7 for each coordinate)

**Returns:**

- Array of coordinates representing the shortest path, including start and target
- Each step in the path must be a valid knight move

**Throws:**

- Error if start or target coordinates are outside the valid board range

**Examples:**

```javascript
knightMoves([0, 0], [1, 2]);
// Returns: [[0, 0], [1, 2]]

knightMoves([0, 0], [3, 3]);
// Returns: [[0, 0], [2, 1], [3, 3]]
// or:      [[0, 0], [1, 2], [3, 3]]
// (both are valid shortest paths with 3 squares)

knightMoves([0, 0], [7, 7]);
// Returns a path with 7 moves (8 squares), e.g.:
// [[0, 0], [2, 1], [4, 2], [6, 3], [4, 4], [6, 5], [7, 7]]
```

## Implementation Details

### Functions

- **`isValidSquare(square)`** - Validates that coordinates are within the 8x8 board
- **`getKnightMoves(square)`** - Returns all valid knight moves from a position
- **`toKey(square)`** - Converts square array to string key for tracking visited positions
- **`fromKey(key)`** - Converts string key back to square array
- **`knightMoves(start, target)`** - Main function using BFS to find shortest path
- **`buildPath(cameFrom, targetKey)`** - Reconstructs the path using parent pointers

### Algorithm Steps

1. Validate input coordinates are on the board
2. Initialize queue with the starting position
3. Create a `visited` set and `cameFrom` map for BFS
4. While queue is not empty:
   - Dequeue the current position
   - If it's the target, reconstruct and return the path
   - Generate all valid knight moves from current position
   - For each unvisited neighbor, mark as visited and enqueue it
5. Return the reconstructed path

## Testing

The project includes comprehensive test coverage with 31 test cases covering:

- Valid and invalid board positions
- Knight move generation (center, edges, corners)
- Coordinate conversion utilities
- Path building logic
- BFS algorithm correctness
- Error handling
- Odin Project specific examples

### Running Tests

```bash
npm test
```

This runs Jest with ES modules support enabled. All tests should pass.

## Project Structure

```
knights-travails/
├── knight.js           # Main implementation
├── knight.test.js      # Comprehensive test suite
├── jest.config.mjs     # Jest configuration for ES modules
├── package.json        # Project dependencies and scripts
└── README.md          # This file
```

## Key Properties

- **Shortest Path Guarantee**: BFS ensures the path found has the minimum number of moves
- **Multiple Valid Paths**: There may be multiple shortest paths; any is correct
- **Complete Coverage**: A knight can reach any square on an 8x8 board from any starting position
- **Symmetric**: The number of moves from A to B equals the number of moves from B to A

## Learning Outcomes

This project demonstrates:

- Graph representation and traversal
- Breadth-first search algorithm
- Queue data structures
- Path reconstruction
- Algorithm analysis and complexity
- Test-driven development

## Resources

- [The Odin Project - Knights Travails](https://www.theodinproject.com/lessons/javascript-knights-travails)
- [Khan Academy - Describing Graphs](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs)
- [Khan Academy - Representing Graphs](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs)
