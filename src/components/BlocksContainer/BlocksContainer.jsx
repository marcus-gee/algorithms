import { React, useRef } from "react";
import "./BlocksContainer.css";
import tooltip from "./tooltip.png";

function BlocksContainer(props) {
  const {
    name,
    array,
    algorithm,
    algorithmInfo,
    delay,
    sortedContainers,
    setSortedContainers,
    dataIndex,
  } = props;
  let localArray = [...array];
  const blocksRef = useRef(null);

  function animateSort(algorithm, array) {
    const animations = algorithm(array);
    animations.forEach((animation, index) => {
      setTimeout(() => {
        if (animation["type"] === "access") {
          animation["indices"].map((i) => animateAccess(i));
        } else if (animation["type"] === "swap") {
          animateSwap(animation["indices"]);
        } else if (animation["type"] === "insert") {
          animateInsert(animation["indices"], animation["height"]);
        }
      }, index * delay);
    });
  }

  function animateAccess(index) {
    const blocks = blocksRef.current.children;

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
    const blocks = blocksRef.current.children;
    const [i, j] = indices;
    const [iHeight, jHeight] = [blocks[i].style.height, blocks[j].style.height];

    const iStyle = blocks[i].style;
    iStyle.height = jHeight;
    const jStyle = blocks[j].style;
    jStyle.height = iHeight;
  }

  function animateInsert(index, height) {
    const blocks = blocksRef.current.children;

    const style = blocks[index].style;
    style.height = `${height}px`;
  }

  return (
    <div className="BlocksContainer-container">
      <h3 className="BlocksContainer-info">{name}</h3>
      <div className="BlocksContainer-tooltip">
        <img src={tooltip} className="BlocksContainer-tooltipicon" />
        <span className="BlocksContainer-tooltiptext">
          Worst Case:
          <span style={algorithmInfo["worst"]["style"]}>
            {` ${algorithmInfo["worst"]["text"]}`}
          </span>
          <br />
          Best Case:
          <span style={algorithmInfo["best"]["style"]}>
            {` ${algorithmInfo["best"]["text"]}`}
          </span>
          <br />
          Average:
          <span style={algorithmInfo["average"]["style"]}>
            {` ${algorithmInfo["average"]["text"]}`}
          </span>
          <br />
          Description:
          <span style={{ margin: 0 }}>
            {` ${algorithmInfo["description"]}`}
          </span>
        </span>
      </div>
      <button
        className={
          sortedContainers[dataIndex]
            ? "BlocksContainer-runbutton BlocksContainer-disabled"
            : "BlocksContainer-runbutton"
        }
        disabled={sortedContainers[dataIndex]}
        onClick={() => {
          animateSort(algorithm, localArray);
          setSortedContainers(
            sortedContainers.map((val, index) =>
              index === dataIndex ? true : val
            )
          );
        }}
      >
        Run
      </button>

      <div className="BlocksContainer-blocks" ref={blocksRef}>
        {localArray.map((value, index) => (
          <div
            className="BlocksContainer-block"
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

export default BlocksContainer;
