// http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

export function manhattanDistance(cell, start, end) {
  const D = 1;
  // This is the Manhattan distance
  var d1 = Math.abs(end[0] - cell[0]);
  var d2 = Math.abs(end[1] - cell[1]);
  return D * (d1 + d2);
}

export function startEndCrossProduct(cell, start, end) {
  const dx1 = cell[0] - end[0];
  const dy1 = cell[1] - end[1];
  const dx2 = start[0] - end[0];
  const dy2 = start[1] - end[1];
  return Math.abs(dx1 * dy2 - dx2 * dy1) * 0.001;
}
