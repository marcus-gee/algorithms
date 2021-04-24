import React from "react";
import "./Slider.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Slider-container">
        <span>
          <p>
            Number of Blocks:{" "}
            {
              <input
                className="Slider-numberinput"
                type="number"
                min={this.props.slider_min}
                max={this.props.slider_max}
                value={this.props.slider_value}
                onChange={this.props.handleSliderChange}
              />
            }
          </p>
        </span>

        <input
          className="Slider-slider"
          type="range"
          min={this.props.slider_min}
          max={this.props.slider_max}
          step={this.props.slider_step}
          value={this.props.slider_value}
          onChange={this.props.handleSliderChange}
        />
      </div>
    );
  }
}

export default Slider;
