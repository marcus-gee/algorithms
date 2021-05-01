import { React, useRef } from "react";
import "./AlgoContainer.css";
import { algorithmDescriptions } from "../Utilities/sortingAlgorithmDescriptions";

function AlgoContainer(props) {
  const {
    name,
    array,
    sortingAlgorithm,
    delay,
    sortedContainers,
    setSortedContainers,
    dataIndex,
  } = props;
  let localArray = [...array];
  const blocksContainerRef = useRef(null);

  function animateSort(sortingAlgorithm, array) {
    const animations = sortingAlgorithm(array);
    animations.forEach(([barIndices, type], index) => {
      setTimeout(() => {
        if (type === "comparison") {
          barIndices.map((i) => animateComparison(i));
        } else if (type === "swap") {
          animateSwap(barIndices);
        }
      }, index * delay);
    });
  }

  function animateComparison(index) {
    const blocks = blocksContainerRef.current.children;

    setTimeout(() => {
      const style = blocks[index].style;
      style.backgroundColor = "red";
    }, delay);
    setTimeout(() => {
      const style = blocks[index].style;
      style.backgroundColor = "";
    }, delay * 2);
  }

  function animateSwap(indices) {
    const blocks = blocksContainerRef.current.children;
    const [i, j] = indices;
    const [iHeight, jHeight] = [blocks[i].style.height, blocks[j].style.height];

    const iStyle = blocks[i].style;
    iStyle.height = jHeight;
    const jStyle = blocks[j].style;
    jStyle.height = iHeight;
  }

  // todo: tooltips could be abstracted
  return (
    <div className="AlgoContainer-container">
      <div className="AlgoContainer-info">
        <h3 className="AlgoContainer-tooltip">
          {`${name} Sort`}
          <span className="AlgoContainer-tooltiptext">
            {"Worst Case: "}
            <span
              style={{
                color: algorithmDescriptions[name]["worst"]["color"],
                margin: 0,
              }}
            >
              {algorithmDescriptions[name]["worst"]["text"]}
            </span>
            <br />
            {"Best Case: "}
            <span
              style={{
                color: algorithmDescriptions[name]["best"]["color"],
                margin: 0,
              }}
            >
              {algorithmDescriptions[name]["best"]["text"]}
            </span>
            <br />
            {"Average: "}
            <span
              style={{
                color: algorithmDescriptions[name]["average"]["color"],
                margin: 0,
              }}
            >
              {algorithmDescriptions[name]["average"]["text"]}
            </span>
            <br />
            {"Description: "}
            <span style={{ margin: 0 }}>
              {algorithmDescriptions[name]["description"]}
            </span>
          </span>
        </h3>
        <h5>0.00ms</h5>
      </div>
      <button
        className={
          sortedContainers[dataIndex]
            ? "AlgoContainer-runbutton AlgoContainer-disabled"
            : "AlgoContainer-runbutton"
        }
        disabled={sortedContainers[dataIndex]}
        onClick={() => {
          animateSort(sortingAlgorithm, localArray);
          setSortedContainers(
            sortedContainers.map((val, index) =>
              index === dataIndex ? true : val
            )
          );
        }}
      >
        Run
      </button>

      <div className="AlgoContainer-blocks" ref={blocksContainerRef}>
        {localArray.map((value, index) => (
          <div
            className="AlgoContainer-block"
            style={{
              height: `${value}px`,
              width: `${100 / localArray.length}%`,
            }}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AlgoContainer;
