import { React, useRef, useEffect } from "react";
import "./AlgoContainer.css";

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

  return (
    <div className="AlgoContainer-container">
      <div className="AlgoContainer-info">
        <h3>{`${name} Sort`}</h3>
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
