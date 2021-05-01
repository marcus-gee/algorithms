import React from "react";
import "./Slider.css";

function Slider(props) {
  const {
    prompt,
    slider_value,
    slider_min,
    slider_max,
    slider_step,
    disabled,
    handleSliderChange,
  } = props;

  return (
    <>
      <span>
        {prompt}
        {
          <input
            className="Slider-numberinput"
            type="number"
            min={slider_min}
            max={slider_max}
            value={slider_value}
            disabled={disabled}
            onChange={handleSliderChange}
          />
        }
      </span>

      <input
        className={disabled ? "Slider-slider Slider-disabled" : "Slider-slider"}
        type="range"
        min={slider_min}
        max={slider_max}
        step={slider_step}
        value={slider_value}
        disabled={disabled}
        onChange={handleSliderChange}
      />
    </>
  );
}

export default Slider;
