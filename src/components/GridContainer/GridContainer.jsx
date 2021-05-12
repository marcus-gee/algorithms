import { React, useRef } from "react";
import "./GridContainer.css";

function GridContainer(props) {
  const {
    name,
    algorithm,
    algorithmInfo,
    delay,
    nRows,
    nCols,
    start,
    end,
    completedContainers,
    setCompletedContainers,
    dataIndex,
  } = props;
  const gridRef = useRef(null);
  const weights = [];

  function animatePathfind(algorithm) {
    const animations = algorithm(start, end, nRows, nCols, weights);
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const grid = gridRef.current;
        const [row, col] = animation["indices"];
        const cell = grid.children[0].children[row].children[col];

        if (animation["type"] === "visit") {
          cell.className += " visited";
        } else if (animation["type"] === "path") {
          cell.classList.remove("visited");
          cell.className += " path";
        }
      }, index * delay);
    });
  }

  return (
    <div className="GridContainer-container">
      <div className="GridContainer-info">
        <h3 className="GridContainer-tooltip">
          {name}
          <span className="GridContainer-tooltiptext">
            Worst Case:
            <span style={algorithmInfo["worst"]["style"]}>
              {` ${algorithmInfo["worst"]["text"]}`}
            </span>
            <br />
            Description:
            <span style={{ margin: 0 }}>
              {` ${algorithmInfo["description"]}`}
            </span>
          </span>
        </h3>
        <h5>0.00ms</h5>
      </div>
      <button
        className={
          completedContainers[dataIndex]
            ? "GridContainer-runbutton GridContainer-disabled"
            : "GridContainer-runbutton"
        }
        disabled={completedContainers[dataIndex]}
        onClick={() => {
          animatePathfind(algorithm);
          setCompletedContainers(
            completedContainers.map((val, index) =>
              index === dataIndex ? true : val
            )
          );
        }}
      >
        Run
      </button>

      <table className={"GridContainer-grid"} ref={gridRef}>
        <tbody>
          {[...Array(nRows)].map((_, i) => (
            <tr key={i}>
              {[...Array(nCols)].map((_, j) =>
                start[0] === i && start[1] === j ? (
                  <td className={"GridContainer-start"} key={j}></td>
                ) : end[0] === i && end[1] === j ? (
                  <td className={"GridContainer-end"} key={j}></td>
                ) : (
                  <td className={"GridContainer-cell"} key={j}></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridContainer;
