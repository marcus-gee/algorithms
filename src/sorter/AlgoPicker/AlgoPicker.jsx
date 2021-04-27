import React from "react";
import "./AlgoPicker.css";

function AlgoPicker(props) {
  const { algorithms, selected, handleAlgorithmClick } = props;

  return (
    <>
      <p>Algorithms:</p>
      {algorithms.map((algorithm, index) => (
        <button
          className={
            selected.some((item) => item === algorithm)
              ? "AlgoPicker-name AlgoPicker-active"
              : "AlgoPicker-name AlgoPicker-inactive"
          }
          key={index}
          onClick={() => handleAlgorithmClick(algorithm)}
        >
          {`${algorithm} Sort`}
        </button>
      ))}
    </>
  );
}

export default AlgoPicker;
