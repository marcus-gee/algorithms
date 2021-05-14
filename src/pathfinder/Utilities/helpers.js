export function cellsEqual(cell1, cell2) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1];
}

export function getWeights(cell, weights) {
  return weights[cell] ? weights[cell] : 1;
}

function getNeighbors(row, col, maxRow, maxCol) {
  let neighbors = [];
  // top
  if (row > 0) neighbors.push([row - 1, col]);
  // right
  if (col < maxCol - 1) neighbors.push([row, col + 1]);
  // bottom
  if (row < maxRow - 1) neighbors.push([row + 1, col]);
  // left
  if (col > 0) neighbors.push([row, col - 1]);

  return neighbors;
}

export function initAdjacencyMatrix(rowLength, colLength) {
  let adjacencyMatrix = new Map();
  for (let i = 0; i < rowLength; i++) {
    adjacencyMatrix.set(i, new Map());

    for (let j = 0; j < colLength; j++) {
      let neighbors = getNeighbors(i, j, rowLength, colLength);

      adjacencyMatrix.get(i).set(j, neighbors);
    }
  }

  return adjacencyMatrix;
}

export function initVisited(rowLength, colLength) {
  let visited = new Map();
  for (let i = 0; i < rowLength; i++) {
    visited.set(i, new Map());

    for (let j = 0; j < colLength; j++) {
      visited.get(i).set(j, false);
    }
  }

  return visited;
}

export function initDistances(start, rowLength, colLength) {
  let distances = new Map();
  for (let i = 0; i < rowLength; i++) {
    distances.set(i, new Map());
    for (let j = 0; j < colLength; j++) {
      distances.get(i).set(j, cellsEqual(start, [i, j]) ? 0 : Infinity);
    }
  }

  return distances;
}
