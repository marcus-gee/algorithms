import { React, useRef } from "react";
import "./GridContainer.css";

function GridContainer(props) {
  const {
    name,
    algorithm,
    algorithmInfo,
    delay,
    grid,
    nRows,
    nCols,
    start,
    end,
    completedContainers,
    setCompletedContainers,
    dataIndex,
  } = props;
  let localGrid = grid.map((x) => x.slice());
  const gridRef = useRef(null);
  const weights = [];

  function animatePathfind(algorithm) {
    const animations = algorithm(start, end, nRows, nCols, weights);
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const ref = gridRef.current;
        const [row, col] = animation["indices"];
        const cell = ref.children[0].children[row].children[col];

        if (animation["type"] === "visit") {
          cell.className += " visited";
          localGrid[row][col] = "visited";
        } else if (animation["type"] === "path") {
          cell.className += " path";
          localGrid[row][col] = "path";
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
          {localGrid.map((_, i) => (
            <tr key={i}>
              {localGrid[i].map((_, j) => (
                <td className={`GridContainer-${localGrid[i][j]}`} key={j}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridContainer;
