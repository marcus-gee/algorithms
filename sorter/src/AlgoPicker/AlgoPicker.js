import React from "react";
import "./AlgoPicker.css";

class AlgoPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AlgoPicker-container">
        <p>Algorithms:</p>
        {this.props.algorithms.map((algorithm, index) => {
          return (
            <button
              className={
                this.props.selected.some((item) => item === algorithm)
                  ? "AlgoPicker-name AlgoPicker-active"
                  : "AlgoPicker-name AlgoPicker-inactive"
              }
              key={index}
              onClick={() => this.props.handleAlgorithmClick(algorithm)}
            >
              {`${algorithm} Sort`}
            </button>
          );
        })}
      </div>
    );
  }
}

export default AlgoPicker;
