import React from "react";
import "./AlgoContainer.css";

class AlgoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AlgoContainer-container">
        <div className="AlgoContainer-info">
          <h3>{`${this.props.name} Sort`}</h3>
          <h5>0.00ms</h5>
        </div>
        <button className="AlgoContainer-runbutton">Run</button>
        <div className="AlgoContainer-blocks">
          {this.props.array.map((value, index) => {
            return (
              <div
                className="AlgoContainer-block"
                style={{
                  height: `${value}px`,
                  width: `${100 / this.props.array.length}%`,
                }}
                key={index}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AlgoContainer;
