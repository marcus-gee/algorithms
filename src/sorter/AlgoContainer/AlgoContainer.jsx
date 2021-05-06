import { React, useRef } from "react";
import "./AlgoContainer.css";
import { algorithmInfos } from "../Utilities/sortingAlgorithmInfos";

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
    animations.forEach(([barData, type], index) => {
      setTimeout(() => {
        if (type === "access") {
          barData.map((i) => animateAccess(i));
        } else if (type === "swap") {
          animateSwap(barData);
        } else if (type === "insert") {
          const [index, height] = barData;
          animateInsert(index, height);
        }
      }, index * delay);
    });
  }

  function animateAccess(index) {
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

  function animateInsert(index, height) {
    const blocks = blocksContainerRef.current.children;

    const style = blocks[index].style;
    style.height = `${height}px`;
  }

  return (
    <div className="AlgoContainer-container">
      <div className="AlgoContainer-info">
        <h3 className="AlgoContainer-tooltip">
          {`${name} Sort`}
          <span className="AlgoContainer-tooltiptext">
            Worst Case:
            <span style={algorithmInfos[name]["worst"]["style"]}>
              {` ${algorithmInfos[name]["worst"]["text"]}`}
            </span>
            <br />
            Best Case:
            <span style={algorithmInfos[name]["best"]["style"]}>
              {` ${algorithmInfos[name]["best"]["text"]}`}
            </span>
            <br />
            Average:
            <span style={algorithmInfos[name]["average"]["style"]}>
              {` ${algorithmInfos[name]["average"]["text"]}`}
            </span>
            <br />
            Description:
            <span style={{ margin: 0 }}>
              {` ${algorithmInfos[name]["description"]}`}
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
