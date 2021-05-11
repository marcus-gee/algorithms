import React, { useState, useEffect } from "react";
import AlgoPicker from "../components/AlgoPicker/AlgoPicker.jsx";
import GridContainer from "../components/GridContainer/GridContainer.jsx";
import { djikstra, aStar, bfs, dfs } from "./Utilities/pathfinderAlgorithms";
import { algorithmInfos } from "./Utilities/pathfinderAlgorithmInfos";
import "./PathfinderApp.css";

const DELAY = 1;
const ALGORITHMS = {
  "Djikstra's": djikstra,
  "A\u002A": aStar,
  "Breadth First Search": bfs,
  "Depth First Search": dfs,
};

const N_ROWS = 15;
const N_COLS = 50;
const DEFAULT_START = [7, 5];
const DEFAULT_END = [7, 44];

function PathfinderApp() {
  const [selected, setSelected] = useState([]);
  const [start, setStart] = useState(DEFAULT_START);
  const [end, setEnd] = useState(DEFAULT_END);
  const [completedContainers, setCompletedContainers] = useState([]);

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
            delay={DELAY}
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
