import { cellsEqual, initAdjacencyMatrix, initVisited } from "./helpers";

export function maze(start, end, nRows, nCols) {
  // A Grid consists of a 2 dimensional array of cells. A Cell has 2 states: Blocked or Passage.
  // Start with a Grid full of Cells in state Blocked.
  let walls = {};
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nCols; j++) {
      if (cellsEqual(start, [i, j]) || cellsEqual(end, [i, j])) {
        walls[`${i}.${j}`] = false;
      } else {
        walls[`${i}.${j}`] = true;
      }
    }
  }

  /*
   * Pick a random Cell, set it to state Passage and Compute its frontier cells.
   * A frontier cell of a Cell is a cell with distance 2 in state Blocked and within the grid.
   */
  let frontierCells = [];
  getFrontierCells(start).forEach(([row, col]) => {
    if (walls[`${row}.${col}`]) {
      frontierCells.push([row, col]);
    }
  });
  getFrontierCells(end).forEach(([row, col]) => {
    if (walls[`${row}.${col}`]) {
      frontierCells.push([row, col]);
    }
  });

  // While the list of frontier cells is not empty:
  while (frontierCells.length) {
    console.log(frontierCells.length);
    // Pick a random frontier cell from the list of frontier cells.
    const frontierCell = randomCell(frontierCells);

    // Let neighbors(frontierCell) = All cells in distance 2 in state Passage. Pick a random neighbor
    const neighbors = getFrontierCells(frontierCell).filter(
      ([i, j]) => !walls[`${i}.${j}`]
    );

    const neighbor = randomCell(neighbors);

    // connect the frontier cell with the neighbor by setting the cell in-between to state Passage
    const inBetween = [
      Math.floor((neighbor[0] + frontierCell[0]) / 2),
      Math.ceil((neighbor[1] + frontierCell[1]) / 2),
    ];

    walls[frontierCell.join(".")] = false;
    walls[inBetween.join(".")] = false;
    walls[neighbor.join(".")] = false;

    // Compute the frontier cells of the chosen frontier cell and add them to the frontier list.
    getFrontierCells(frontierCell)
      .filter(([i, j]) => walls[`${i}.${j}`])
      .forEach(([row, col]) => {
        frontierCells.push([row, col]);
      });
    // Remove the chosen frontier cell from the list of frontier cells.
  }

  return walls;
}

function getFrontierCells(cell) {
  // frontier cells of a Cell is a cell with distance 2
  const [row, col] = cell;
  return [
    [row - 2, col], // up 2
    [row - 1, col + 1], // upper right diag
    [row, col + 2], // right 2
    [row + 1, col + 1], // lower right diag
    [row + 2, col], // down 2
    [row + 1, col - 1], // lower left diag
    [row, col - 2], // left 2
    [row - 1, col - 1], // upper left diag
  ];
}

function randomCell(lst) {
  const idx = Math.floor(Math.random() * lst.length);
  return lst.splice(idx, 1)[0];
}
