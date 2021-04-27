import React from "react";
import "./AlgoContainer.css";

function AlgoContainer(props) {
  const { name, array } = props;

  return (
    <div className="AlgoContainer-container">
      <div className="AlgoContainer-info">
        <h3>{`${name} Sort`}</h3>
        <h5>0.00ms</h5>
      </div>
      <button className="AlgoContainer-runbutton">Run</button>
      <div className="AlgoContainer-blocks">
        {array.map((value, index) => (
          <div
            className="AlgoContainer-block"
            style={{
              height: `${value}px`,
              width: `${100 / array.length}%`,
            }}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AlgoContainer;
