import React, { useState, useEffect } from "react";
import AlgoPicker from "../components/AlgoPicker/AlgoPicker.jsx";
import Slider from "../components/Slider/Slider.jsx";
import GridContainer from "../components/GridContainer/GridContainer.jsx";
import {
  djikstra,
  aStarManhattanDistance,
  aStarCrossProduct,
  bfs,
  dfs,
} from "./Utilities/pathfinderAlgorithms";
import { algorithmInfos } from "./Utilities/pathfinderAlgorithmInfos";
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

const N_ROWS = 30;
const N_COLS = 100;
const DEFAULT_START = [7, 5];
const DEFAULT_END = [22, 94];

function PathfinderApp() {
  const [selected, setSelected] = useState([]);
  const [sortSpeed, setSortSpeed] = useState(SORT_SPEED_DEFAULT);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(DEFAULT_START);
  const [end, setEnd] = useState(DEFAULT_END);
  const [walls, setWalls] = useState([]);
  const [completedContainers, setCompletedContainers] = useState([]);

  useEffect(resetGrid, []);

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

  function resetGrid() {
    Promise.resolve().then(() => {
      setGrid([]); // hacky solution to rerender blank board
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
                  !completedContainers.includes(true)
                    ? "PathfinderApp-button reset disabled"
                    : "PathfinderApp-button reset"
                }
                disabled={!completedContainers.includes(true)}
                onClick={() => {
                  // clear classnames (+ walls)
                  // window.location.reload();
                  resetGrid();
                  setCompletedContainers(completedContainers.map(() => false));
                }}
              >
                Reset All
              </button>
            </div>
          </div>
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
            nRows={N_ROWS}
            nCols={N_COLS}
            start={start}
            end={end}
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
