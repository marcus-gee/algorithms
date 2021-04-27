import React from "react";
import "./Slider.css";

function Slider(props) {
  const {
    slider_value,
    slider_min,
    slider_max,
    slider_step,
    handleSliderChange,
  } = props;

  return (
    <>
      <span>
        Number of Blocks:{" "}
        {
          <input
            className="Slider-numberinput"
            type="number"
            min={slider_min}
            max={slider_max}
            value={slider_value}
            onChange={handleSliderChange}
          />
        }
      </span>

      <input
        className="Slider-slider"
        type="range"
        min={slider_min}
        max={slider_max}
        step={slider_step}
        value={slider_value}
        onChange={handleSliderChange}
      />
    </>
  );
}

export default Slider;
