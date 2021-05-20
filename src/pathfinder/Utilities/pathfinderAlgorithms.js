import Stack from "./Stack";
import Queue from "./Queue";
import PriorityQueue from "./PriorityQueue";
import { manhattanDistance, startEndCrossProduct } from "./heuristics";
import {
  cellsEqual,
  getWeights,
  initAdjacencyMatrix,
  initVisited,
  initDistances,
} from "./helpers";

/* -------------------------------------------------------------------------- */

export const algorithmInfos = {
  "Djikstra's": {
    worst: { text: "O(|E| + |V|log|V|)", style: { color: "black", margin: 0 } },
    description:
      "Djikstra's algorithm is a weighted algorithm that guarantees the shortest path. The algorithm uses a Priority Queue to find the next unvisited vertex with the smallest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller.",
  },
  "A\u002A -  Manhattan Distance": {
    worst: { text: "O(|E|)", style: { color: "black", margin: 0 } },
    description:
      "A* algorithm is a weighted algorithm that guarantees the shortest path. This version uses Manhattan Distance as its heuristic when enqueuing nodes into its Priority Queue when to consider future notes to visit.",
  },
  "A\u002A - Cross Product": {
    worst: { text: "O(|E|)", style: { color: "black", margin: 0 } },
    //
    description:
      "A* algorithm is a weighted algorithm that guarantees the shortest path. This version uses the cross product between the start to end vector and the current cell to end vector as its heuristic when enqueuing nodes into its Priority Queue when to consider future notes to visit.",
  },
  "Breadth First Search": {
    worst: { text: "O(|V| + |E|)", style: { color: "black", margin: 0 } },
    description:
      "Breadth First Search is an unweighted algorithm that guarantees the shortest path. BFS uses a Queue (FIFO) to explores all the nodes at the present depth before moving on to the nodes at the next depth level.",
  },
  "Depth First Search": {
    worst: { text: "O(|V| + |E|)", style: { color: "black", margin: 0 } },
    description:
      "Depth First Search is an unweighted algorithm that does not guarantees the shortest path. DFS uses a Stack (LIFO) to explore nodes of a tree or graph and goes as far as it can down a given branch (path), then backtracks until it finds an unexplored path, and then explores it.",
  },
};

/* -------------------------------------------------------------------------- */

export function djikstra(start, end, maxRow, maxCol, walls, weights) {
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
            if (!visited.get(i).get(j) && !walls[`${i}.${j}`]) {
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

function aStar(start, end, maxRow, maxCol, heuristic, walls, weights) {
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
            if (!visited.get(i).get(j) && !walls[`${i}.${j}`]) {
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
  walls,
  weights
) {
  return aStar(start, end, maxRow, maxCol, manhattanDistance, walls, weights);
}

export function aStarCrossProduct(start, end, maxRow, maxCol, walls, weights) {
  return aStar(
    start,
    end,
    maxRow,
    maxCol,
    startEndCrossProduct,
    walls,
    weights
  );
}

/* -------------------------------------------------------------------------- */

export function bfs(start, end, maxRow, maxCol, walls, weights = {}) {
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
            const [i, j] = element;
            if (!visited.get(i).get(j) && !walls[`${i}.${j}`]) {
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

export function dfs(start, end, maxRow, maxCol, walls, weights = {}) {
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
            const [i, j] = element;
            if (!visited.get(i).get(j) && !walls[`${i}.${j}`]) {
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
