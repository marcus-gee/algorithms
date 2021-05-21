import React, { useState, useEffect } from "react";
import AlgoPicker from "../components/AlgoPicker/AlgoPicker.jsx";
import Slider from "../components/Slider/Slider.jsx";
import GridContainer from "../components/GridContainer/GridContainer.jsx";
import {
  algorithmInfos,
  djikstra,
  aStarManhattanDistance,
  aStarCrossProduct,
  bfs,
  dfs,
} from "./Utilities/pathfinderAlgorithms";
import { randomMazeWalls } from "./Utilities/maze";
import "./PathfinderApp.css";

const ALGORITHMS = {
  "Djikstra's": djikstra,
  "A\u002A -  Manhattan Distance": aStarManhattanDistance,
  "A\u002A - Cross Product": aStarCrossProduct,
  "Breadth First Search": bfs,
  "Depth First Search": dfs,
};

const SORT_SPEED_MIN = 1;
const SORT_SPEED_MAX = 100;
const SORT_SPEED_STEP = 1;
const SORT_SPEED_DEFAULT = 95;

const N_ROWS = 29;
const N_COLS = 99;
const DEFAULT_START = [7, 5];
const DEFAULT_END = [22, 94];

function PathfinderApp() {
  const [selected, setSelected] = useState([]);
  const [sortSpeed, setSortSpeed] = useState(SORT_SPEED_DEFAULT);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(DEFAULT_START);
  const [end, setEnd] = useState(DEFAULT_END);
  const [walls, setWalls] = useState({});
  const [completedContainers, setCompletedContainers] = useState([]);

  useEffect(resetGrid, [start, end]);

  function handleAlgorithmClick(value) {
    if (selected.some((item) => item === value)) {
      const valIdx = selected.indexOf(value);
      setSelected(selected.filter((_, index) => index !== valIdx));
      setCompletedContainers(
        completedContainers.filter((_, index) => index !== valIdx)
      );
    } else {
      setSelected([...selected, value]);
      setCompletedContainers([...completedContainers, false]);
    }
  }

  function handleSpeedChange(event) {
    setSortSpeed(event.target.value);
  }

  function randomMaze() {
    const newGrid = grid.map((x) => x.slice());
    const newWalls = randomMazeWalls(start, end, N_ROWS, N_COLS);

    for (let i = 0; i < N_ROWS; i++) {
      for (let j = 0; j < N_COLS; j++) {
        if (newGrid[i][j] === "wall" || newGrid[i][j] === "unvisited") {
          if (newWalls[`${i}.${j}`]) {
            newGrid[i][j] = "wall";
          } else {
            newGrid[i][j] = "unvisited";
          }
        }
      }
    }

    setWalls(newWalls);
    setGrid(newGrid);
  }

  function randomWalls() {
    const threshold = 0.25;
    const newGrid = grid.map((x) => x.slice());
    const newWalls = {};

    for (let i = 0; i < N_ROWS; i++) {
      for (let j = 0; j < N_COLS; j++) {
        if (newGrid[i][j] === "wall" || newGrid[i][j] === "unvisited") {
          if (Math.random() < threshold) {
            newWalls[`${i}.${j}`] = true;
            newGrid[i][j] = "wall";
          } else {
            newWalls[`${i}.${j}`] = false;
            newGrid[i][j] = "unvisited";
          }
        }
      }
    }

    setWalls(newWalls);
    setGrid(newGrid);
  }

  function resetGrid() {
    Promise.resolve().then(() => {
      setGrid([[]]); // hacky way to rerender blank board
      setGrid(
        [...Array(N_ROWS)].map((_, i) =>
          [...Array(N_COLS)].map((_, j) =>
            start[0] === i && start[1] === j
              ? "start"
              : end[0] === i && end[1] === j
              ? "end"
              : "unvisited"
          )
        )
      );
    });

    setWalls({});
  }

  return (
    <>
      <div className="PathfinderApp-header">
        <h1 className="PathfinderApp-title">Pathfinder</h1>
        <div className="PathfinderApp-headerbuttons">
          <div className="left">
            <div className="PathfinderApp-algopickercontainer">
              <AlgoPicker
                algorithms={Object.keys(ALGORITHMS)}
                selected={selected}
                handleAlgorithmClick={handleAlgorithmClick}
              />
            </div>
            <div className="PathfinderApp-slidercontainer">
              <Slider
                prompt="Speed: "
                slider_value={sortSpeed}
                slider_min={SORT_SPEED_MIN}
                slider_max={SORT_SPEED_MAX}
                slider_step={SORT_SPEED_STEP}
                disabled={completedContainers.includes(true)}
                handleSliderChange={handleSpeedChange}
              />
            </div>
          </div>

          <div className="right">
            <div className="PathfinderApp-buttonscontainer">
              <button
                className={
                  completedContainers.includes(true)
                    ? "PathfinderApp-button maze disabled"
                    : "PathfinderApp-button maze"
                }
                disabled={completedContainers.includes(true)}
                onClick={() => {
                  randomMaze();
                }}
              >
                Random Maze
              </button>
              <button
                className={
                  completedContainers.includes(true)
                    ? "PathfinderApp-button maze disabled"
                    : "PathfinderApp-button maze"
                }
                disabled={completedContainers.includes(true)}
                onClick={() => {
                  randomWalls();
                }}
              >
                Random Walls
              </button>
              <button
                className={
                  !completedContainers.includes(true) &&
                  Object.keys(walls).length === 0
                    ? "PathfinderApp-button reset disabled"
                    : "PathfinderApp-button reset"
                }
                disabled={
                  !completedContainers.includes(true) &&
                  Object.keys(walls).length === 0
                }
                onClick={() => {
                  resetGrid();
                  setCompletedContainers(completedContainers.map(() => false));
                }}
              >
                Reset All
              </button>
            </div>
          </div>

          <ul className="PathfinderApp-key">
            <li className="PathfinderApp-keyitem">
              <div className="key start"></div>
              <span className="value">Start</span>
            </li>
            <li className="PathfinderApp-keyitem">
              <div className="key end"></div>
              <span className="value">End</span>
            </li>
            <li className="PathfinderApp-keyitem">
              <div className="key"></div>
              <span className="value">Unvisited</span>
            </li>
            <li className="PathfinderApp-keyitem">
              <div className="key visited"></div>
              <span className="value">Visited</span>
            </li>
            <li className="PathfinderApp-keyitem">
              <div className="key path"></div>
              <span className="value">Path</span>
            </li>
            <li className="PathfinderApp-keyitem">
              <div className="key wall"></div>
              <span className="value">Wall</span>
            </li>
          </ul>
        </div>
      </div>

      {selected.length ? (
        selected.map((algorithm, index) => (
          <GridContainer
            name={algorithm}
            algorithm={ALGORITHMS[algorithm]}
            algorithmInfo={algorithmInfos[algorithm]}
            delay={100 - sortSpeed + 1}
            grid={grid}
            setGrid={setGrid}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            walls={walls}
            setWalls={setWalls}
            completedContainers={completedContainers}
            setCompletedContainers={setCompletedContainers}
            dataIndex={index}
            key={algorithm}
          />
        ))
      ) : (
        <div className="PathfinderApp-bodyplaceholder">
          Select Algorithm(s) to add
        </div>
      )}
    </>
  );
}

export default PathfinderApp;
