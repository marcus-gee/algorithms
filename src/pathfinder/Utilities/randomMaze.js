// https://www.the-art-of-web.com/javascript/maze-generator/
// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.

export function randomMazeWalls(start, end, nRows, nCols) {
  let maze = new MazeBuilder(start, end, nRows, nCols);

  return maze.walls;
}

class MazeBuilder {
  constructor(start, end, nRows, nCols) {
    this.start = start;
    this.end = end;

    this.rows = nRows;
    this.cols = nCols;

    this.height = (this.rows - 1) / 2;
    this.width = (this.cols - 1) / 2;

    this.maze = this.initArray([]);
    this.walls = {};

    // place initial walls
    this.maze.forEach((row, r) => {
      row.forEach((cell, c) => {
        switch (r) {
          case 0:
          case this.rows - 1:
            if (
              !(
                this.cellsEqual(this.start, [r, c]) ||
                this.cellsEqual(this.end, [r, c])
              )
            ) {
              this.maze[r][c] = ["wall"];
              this.walls[`${r}.${c}`] = true;
            }
            break;

          default:
            if (
              !(
                this.cellsEqual(this.start, [r, c]) ||
                this.cellsEqual(this.end, [r, c])
              )
            ) {
              if (r % 2 === 1) {
                if (c === 0 || c === this.cols - 1) {
                  this.maze[r][c] = ["wall"];
                  this.walls[`${r}.${c}`] = true;
                }
              } else if (c % 2 === 0) {
                this.maze[r][c] = ["wall"];
                this.walls[`${r}.${c}`] = true;
              }
            }
        }
      });
    });

    // start partitioning
    this.partition(1, this.height - 1, 1, this.width - 1);
  }

  initArray(value) {
    return new Array(this.rows)
      .fill()
      .map(() => new Array(this.cols).fill(value));
  }

  rand(min, max) {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

  cellsEqual(cell1, cell2) {
    return cell1[0] === cell2[0] && cell1[1] === cell2[1];
  }

  posToSpace(x) {
    return 2 * (x - 1) + 1;
  }

  posToWall(x) {
    return 2 * x;
  }

  shuffle(array) {
    // sauce: https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  partition(r1, r2, c1, c2) {
    // create partition walls
    // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

    let horiz, vert, x, y, start, end;

    if (r2 < r1 || c2 < c1) {
      return false;
    }

    if (r1 === r2) {
      horiz = r1;
    } else {
      x = r1 + 1;
      y = r2 - 1;
      start = Math.round(x + (y - x) / 4);
      end = Math.round(x + (3 * (y - x)) / 4);
      horiz = this.rand(start, end);
    }

    if (c1 === c2) {
      vert = c1;
    } else {
      x = c1 + 1;
      y = c2 - 1;
      start = Math.round(x + (y - x) / 3);
      end = Math.round(x + (2 * (y - x)) / 3);
      vert = this.rand(start, end);
    }

    for (let i = this.posToWall(r1) - 1; i <= this.posToWall(r2) + 1; i++) {
      for (let j = this.posToWall(c1) - 1; j <= this.posToWall(c2) + 1; j++) {
        if (i === this.posToWall(horiz) || j === this.posToWall(vert)) {
          if (
            !(
              this.cellsEqual(this.start, [i, j]) ||
              this.cellsEqual(this.end, [i, j])
            )
          ) {
            this.maze[i][j] = ["wall"];
            this.walls[`${i}.${j}`] = true;
          }
        }
      }
    }

    let gaps = this.shuffle([true, true, true, false]);

    // create gaps in partition walls

    if (gaps[0]) {
      let gapPosition = this.rand(c1, vert);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
      this.walls[
        `${this.posToWall(horiz)}.${this.posToSpace(gapPosition)}`
      ] = false;
    }

    if (gaps[1]) {
      let gapPosition = this.rand(vert + 1, c2 + 1);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
      this.walls[
        `${this.posToWall(horiz)}.${this.posToSpace(gapPosition)}`
      ] = false;
    }

    if (gaps[2]) {
      let gapPosition = this.rand(r1, horiz);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
      this.walls[
        `${this.posToSpace(gapPosition)}.${this.posToWall(vert)}`
      ] = false;
    }

    if (gaps[3]) {
      let gapPosition = this.rand(horiz + 1, r2 + 1);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
      this.walls[
        `${this.posToSpace(gapPosition)}.${this.posToWall(vert)}`
      ] = false;
    }

    // recursively partition newly created chambers

    this.partition(r1, horiz - 1, c1, vert - 1);
    this.partition(horiz + 1, r2, c1, vert - 1);
    this.partition(r1, horiz - 1, vert + 1, c2);
    this.partition(horiz + 1, r2, vert + 1, c2);
  }
}
