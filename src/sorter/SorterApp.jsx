import React, { useState, useEffect } from "react";
import AlgoPicker from "./AlgoPicker/AlgoPicker.jsx";
import Slider from "./Slider/Slider.jsx";
import AlgoContainer from "./AlgoContainer/AlgoContainer.jsx";
import "./SorterApp.css";

const SLIDER_MIN = 100;
const SLIDER_MAX = 2000;
const SLIDER_STEP = 10;
const SLIDER_DEFAULT = SLIDER_MAX / 2;

const MIN_BLOCK_LENGTH = 10;
const MAX_BLOCK_LENGTH = 500;

const ALGORITHMS = [
  "Bubble",
  "Bucket",
  "Heap",
  "Insertion",
  "Merge",
  "Quick",
  "Radix",
  "Selection",
];

function SorterApp() {
  const [selected, setSelected] = useState([]);
  const [blockNumber, setBlockNumber] = useState(SLIDER_DEFAULT);
  const [array, setArray] = useState([]);

  useEffect(resetArray, []);

  function handleAlgorithmClick(value) {
    if (selected.some((item) => item === value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  }

  function handleSliderChange(event) {
    setBlockNumber(event.target.value);
  }

  function resetArray() {
    setArray(
      [...Array(SLIDER_MAX)].map(() =>
        Math.floor(Math.random() * MAX_BLOCK_LENGTH)
      )
    );
  }

  return (
    <>
      <div className="SorterApp-header">
        <h1 className="SorterApp-title">Sorter</h1>
        <div className="SorterApp-headerbuttons">
          <div className="SorterApp-algopickercontainer">
            <AlgoPicker
              algorithms={ALGORITHMS}
              selected={selected}
              handleAlgorithmClick={handleAlgorithmClick}
            />
          </div>
          <div className="right-wrap">
            <div className="SorterApp-slidercontainer">
              <Slider
                slider_value={blockNumber}
                slider_min={SLIDER_MIN}
                slider_max={SLIDER_MAX}
                slider_step={SLIDER_STEP}
                handleSliderChange={handleSliderChange}
              />
            </div>
            <div className="SorterApp-actionbuttonscontainer">
              <button
                className="SorterApp-actionbutton run"
                onClick={() => console.log("run")}
              >
                Run All
              </button>
              <button
                className="SorterApp-actionbutton reset"
                onClick={() => {
                  resetArray();
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
            key={index}
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
