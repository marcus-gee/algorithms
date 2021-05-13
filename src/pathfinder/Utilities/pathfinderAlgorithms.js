import Stack from "./Stack";
import Queue from "./Queue";
import PriorityQueue from "./PriorityQueue";
import { manhattanDistance, startEndCrossProduct } from "./heuristics";

export function djikstra(start, end, maxRow, maxCol, weights = {}) {
  let animations = [];

  const comparator = (a, b) => a["weight"] <= b["weight"];
  let path = new PriorityQueue(comparator);
  let queue = new PriorityQueue(comparator);

  let adjacencyMatrix = initAdjacencyMatrix(maxRow, maxCol);
  let visited = initVisited(maxRow, maxCol);
  let distances = initDistances(start, maxRow, maxCol);

  queue.enqueue({ data: start, weight: 0 });
  path.enqueue({ data: [start], weight: 0 });
  while (!queue.isEmpty()) {
    let node = queue.dequeue(),
      [row, col] = node["data"],
      distance = node["weight"];
    let finalPath = path.dequeue()["data"];

    if (!visited.get(row).get(col)) {
      visited.get(row).set(col, true);
      animations.push({ indices: [row, col], type: "visit" });

      if (cellsEqual(end, [row, col])) {
        // reached end cell
        finalPath.forEach((cell) => {
          animations.push({ indices: cell, type: "path" });
        });
        break;
      } else {
        // add neighbors to stack
        adjacencyMatrix
          .get(row)
          .get(col)
          .forEach((element) => {
            const [i, j] = element;
            if (!visited.get(i).get(j)) {
              const w = getWeights(element, weights);
              if (distance + w < distances.get(i).get(j)) {
                queue.enqueue({ data: element, weight: distance + w });
                path.enqueue({
                  data: [...finalPath, element],
                  weight: distance + w,
                });
                distances.get(i).set(j, distance + w);
              }
            }
          });
      }
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

function aStar(start, end, maxRow, maxCol, heuristic, weights = {}) {
  let animations = [];

  const comparator = (a, b) => a["weight"] <= b["weight"];
  let path = new PriorityQueue(comparator);
  let queue = new PriorityQueue(comparator);

  let adjacencyMatrix = initAdjacencyMatrix(maxRow, maxCol);
  let visited = initVisited(maxRow, maxCol);
  let distances = initDistances(start, maxRow, maxCol);

  queue.enqueue({ data: start, weight: 0 });
  path.enqueue({ data: [start], weight: 0 });
  while (!queue.isEmpty()) {
    let node = queue.dequeue(),
      [row, col] = node["data"],
      distance = node["weight"];
    let finalPath = path.dequeue()["data"];

    if (!visited.get(row).get(col)) {
      visited.get(row).set(col, true);
      animations.push({ indices: [row, col], type: "visit" });

      if (cellsEqual(end, [row, col])) {
        // reached end cell
        finalPath.forEach((cell) => {
          animations.push({ indices: cell, type: "path" });
        });
        break;
      } else {
        // add neighbors to stack
        adjacencyMatrix
          .get(row)
          .get(col)
          .forEach((element) => {
            const [i, j] = element;
            if (!visited.get(i).get(j)) {
              const g = heuristic(element, start, end);
              if (distance + g < distances.get(i).get(j)) {
                queue.enqueue({ data: element, weight: distance + g });
                path.enqueue({
                  data: [...finalPath, element],
                  weight: distance + g,
                });
                distances.get(i).set(j, distance + g);
              }
            }
          });
      }
    }
  }

  return animations;
}

export function aStarManhattanDistance(
  start,
  end,
  maxRow,
  maxCol,
  weights = {}
) {
  return aStar(start, end, maxRow, maxCol, manhattanDistance, (weights = {}));
}

export function aStarCrossProduct(start, end, maxRow, maxCol, weights = {}) {
  return aStar(
    start,
    end,
    maxRow,
    maxCol,
    startEndCrossProduct,
    (weights = {})
  );
}

/* -------------------------------------------------------------------------- */

export function bfs(start, end, maxRow, maxCol, weights = {}) {
  let animations = [];
  let path = new Queue();
  let queue = new Queue();

  let adjacencyMatrix = initAdjacencyMatrix(maxRow, maxCol);
  let visited = initVisited(maxRow, maxCol);

  queue.enqueue(start);
  path.enqueue([start]);
  while (!queue.isEmpty()) {
    let [row, col] = queue.dequeue();
    let finalPath = path.dequeue();

    if (!visited.get(row).get(col)) {
      visited.get(row).set(col, true);
      animations.push({ indices: [row, col], type: "visit" });

      if (cellsEqual(end, [row, col])) {
        // reached end cell
        finalPath.forEach((cell) => {
          animations.push({ indices: cell, type: "path" });
        });
        break;
      } else {
        // add neighbors to stack
        adjacencyMatrix
          .get(row)
          .get(col)
          .forEach((element) => {
            if (!visited.get(element[0]).get(element[1])) {
              queue.enqueue(element);
              path.enqueue([...finalPath, element]);
            }
          });
      }
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

export function dfs(start, end, maxRow, maxCol, weights = {}) {
  let animations = [];
  let path = new Stack();
  let stack = new Stack();

  let adjacencyMatrix = initAdjacencyMatrix(maxRow, maxCol);
  let visited = initVisited(maxRow, maxCol);

  stack.push(start);
  path.push([start]);
  while (!stack.isEmpty()) {
    let [row, col] = stack.pop();
    let finalPath = path.pop();

    if (!visited.get(row).get(col)) {
      visited.get(row).set(col, true);
      animations.push({ indices: [row, col], type: "visit" });

      if (cellsEqual(end, [row, col])) {
        // reached end cell
        finalPath.forEach((cell) => {
          animations.push({ indices: cell, type: "path" });
        });
        break;
      } else {
        // add neighbors to stack
        adjacencyMatrix
          .get(row)
          .get(col)
          .forEach((element) => {
            if (!visited.get(element[0]).get(element[1])) {
              stack.push(element);
              path.push([...finalPath, element]);
            }
          });
      }
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

function cellsEqual(cell1, cell2) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1];
}

function getWeights(cell, weights) {
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

function initAdjacencyMatrix(rowLength, colLength) {
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

function initVisited(rowLength, colLength) {
  let visited = new Map();
  for (let i = 0; i < rowLength; i++) {
    visited.set(i, new Map());

    for (let j = 0; j < colLength; j++) {
      visited.get(i).set(j, false);
    }
  }

  return visited;
}

function initDistances(start, rowLength, colLength) {
  let distances = new Map();
  for (let i = 0; i < rowLength; i++) {
    distances.set(i, new Map());
    for (let j = 0; j < colLength; j++) {
      distances.get(i).set(j, cellsEqual(start, [i, j]) ? 0 : Infinity);
    }
  }

  return distances;
}
