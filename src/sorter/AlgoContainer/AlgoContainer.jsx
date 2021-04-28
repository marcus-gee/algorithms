import { React, useRef } from "react";
import "./AlgoContainer.css";

const DELAY = 1;

function AlgoContainer(props) {
  const { name, array, sortingAlgorithm } = props;
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
      }, index * DELAY);
    });
  }

  function animateComparison(index) {
    const blocks = blocksContainerRef.current.children;

    setTimeout(() => {
      const style = blocks[index].style;
      style.backgroundColor = "red";
    }, DELAY);
    setTimeout(() => {
      const style = blocks[index].style;
      style.backgroundColor = "";
    }, DELAY * 2);
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
        className="AlgoContainer-runbutton"
        onClick={() => {
          animateSort(sortingAlgorithm, localArray);
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
