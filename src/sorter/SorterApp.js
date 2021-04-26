import React from "react";
import AlgoPicker from "./AlgoPicker/AlgoPicker.js";
import Slider from "./Slider/Slider.js";
import AlgoContainer from "./AlgoContainer/AlgoContainer.js";
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

class SorterApp extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: [],
      blockNumber: SLIDER_DEFAULT,
      array: [...Array(SLIDER_MAX)].map(() =>
        Math.floor(Math.random() * MAX_BLOCK_LENGTH)
      ),
    };
    this.handleAlgorithmClick = this.handleAlgorithmClick.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleAlgorithmClick(value) {
    if (this.state.selected.some((item) => item === value)) {
      this.setState({
        selected: this.state.selected.filter((item) => item !== value),
      });
    } else {
      this.setState({ selected: [...this.state.selected, value] });
    }
  }

  handleSliderChange(event) {
    this.setState({ blockNumber: event.target.value });
  }

  render() {
    const header = (
      <div className="SorterApp-header">
        <h1 className="SorterApp-title">Sorter</h1>
        <div style={{ display: "inline-block", width: "50%" }}>
          <div className="SorterApp-algopickercontainer">
            <AlgoPicker
              algorithms={ALGORITHMS}
              selected={this.state.selected}
              handleAlgorithmClick={this.handleAlgorithmClick}
            />
          </div>
          <div className="right-wrap">
            <div className="SorterApp-slidercontainer">
              <Slider
                slider_value={this.state.blockNumber}
                slider_min={SLIDER_MIN}
                slider_max={SLIDER_MAX}
                slider_default={SLIDER_DEFAULT}
                slider_step={SLIDER_STEP}
                handleSliderChange={this.handleSliderChange}
              />
            </div>
            <div className="SorterApp-actionbuttonscontainer">
              <button className="SorterApp-actionbutton run">Run All</button>
              <button className="SorterApp-actionbutton reset">
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    const body = this.state.selected.map((algorithm, index) => {
      return (
        <AlgoContainer
          name={algorithm}
          array={this.state.array.slice(0, this.state.blockNumber)}
          key={index}
        />
      );
    });

    const bodyPlaceholder = (
      <div className="SorterApp-bodyplaceholder">
        Select Algorithm(s) to add
      </div>
    );

    return (
      <>
        <>{header}</>
        <>{body.length ? body : bodyPlaceholder}</>
      </>
    );
  }
}

export default SorterApp;
