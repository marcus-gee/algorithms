import React, { useState, useEffect } from "react";
import AlgoPicker from "./AlgoPicker/AlgoPicker.jsx";
import Slider from "./Slider/Slider.jsx";
import AlgoContainer from "./AlgoContainer/AlgoContainer.jsx";
import {
  bubbleSort,
  bucketSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  selectionSort,
} from "./Utilities/sortingAlgorithms";
import "./SorterApp.css";

const BLOCK_NUM_MIN = 10;
const BLOCK_NUM_MAX = 500;
const BLOCK_NUM_STEP = 10;
const BLOCK_NUM_DEFAULT = BLOCK_NUM_MAX / 2;

const SORT_SPEED_MIN = 1;
const SORT_SPEED_MAX = 100;
const SORT_SPEED_STEP = 1;
const SORT_SPEED_DEFAULT = SORT_SPEED_MAX;

const MIN_BLOCK_LENGTH = 10;
const MAX_BLOCK_LENGTH = 500;

const ALGORITHMS = {
  Bubble: bubbleSort,
  Bucket: bucketSort,
  Heap: heapSort,
  Insertion: insertionSort,
  Merge: mergeSort,
  Quick: quickSort,
  Radix: radixSort,
  Selection: selectionSort,
};

function SorterApp() {
  const [selected, setSelected] = useState([]);
  const [blockNumber, setBlockNumber] = useState(BLOCK_NUM_DEFAULT);
  const [sortSpeed, setSortSpeed] = useState(SORT_SPEED_DEFAULT);
  const [array, setArray] = useState([]);
  const [sortedContainers, setSortedContainers] = useState([]);

  useEffect(resetArray, []);

  function handleAlgorithmClick(value) {
    if (selected.some((item) => item === value)) {
      const valIdx = selected.indexOf(value);
      setSelected(selected.filter((_, index) => index !== valIdx));
      setSortedContainers(
        sortedContainers.filter((_, index) => index !== valIdx)
      );
    } else {
      setSelected([...selected, value]);
      setSortedContainers([...sortedContainers, false]);
    }
  }

  function handleBlockNumChange(event) {
    setBlockNumber(event.target.value);
  }

  function handleSpeedChange(event) {
    setSortSpeed(event.target.value);
  }

  function resetArray() {
    setArray(
      [...Array(BLOCK_NUM_MAX)].map(() =>
        Math.floor(Math.random() * MAX_BLOCK_LENGTH)
      )
    );
  }

  return (
    <>
      <div className="SorterApp-header">
        <h1 className="SorterApp-title">Sorter</h1>
        <div className="SorterApp-headerbuttons">
          <div className="left">
            <div className="SorterApp-algopickercontainer">
              <AlgoPicker
                algorithms={Object.keys(ALGORITHMS)}
                selected={selected}
                handleAlgorithmClick={handleAlgorithmClick}
              />
            </div>
            <div className="SorterApp-slidercontainer">
              <Slider
                prompt="Number of Blocks: "
                slider_value={blockNumber}
                slider_min={BLOCK_NUM_MIN}
                slider_max={BLOCK_NUM_MAX}
                slider_step={BLOCK_NUM_STEP}
                disabled={sortedContainers.includes(true)}
                handleSliderChange={handleBlockNumChange}
              />
            </div>
            <div className="SorterApp-slidercontainer">
              <Slider
                prompt="Sorting Speed: "
                slider_value={sortSpeed}
                slider_min={SORT_SPEED_MIN}
                slider_max={SORT_SPEED_MAX}
                slider_step={SORT_SPEED_STEP}
                disabled={sortedContainers.includes(true)}
                handleSliderChange={handleSpeedChange}
              />
            </div>
          </div>

          <div className="right">
            <div className="SorterApp-buttonscontainer">
              <button
                className={
                  sortedContainers.includes(true)
                    ? "SorterApp-button run disabled"
                    : "SorterApp-button run"
                }
                disabled={sortedContainers.includes(true)} // todo: here
                onClick={() => {
                  alert("doesn't work (yet)... run individually");
                }}
              >
                Run All
              </button>
              <button
                className={
                  !sortedContainers.includes(true)
                    ? "SorterApp-button reset disabled"
                    : "SorterApp-button reset"
                }
                disabled={!sortedContainers.includes(true)}
                onClick={() => {
                  resetArray();
                  setSortedContainers(sortedContainers.map(() => false));
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
          <AlgoContainer
            name={algorithm}
            array={array.slice(0, blockNumber)}
            sortingAlgorithm={ALGORITHMS[algorithm]}
            delay={100 - sortSpeed + 1}
            sortedContainers={sortedContainers}
            setSortedContainers={setSortedContainers}
            dataIndex={index}
            key={algorithm}
          />
        ))
      ) : (
        <div className="SorterApp-bodyplaceholder">
          Select Algorithm(s) to add
        </div>
      )}
    </>
  );
}

export default SorterApp;
