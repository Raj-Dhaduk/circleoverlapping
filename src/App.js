import React, { useEffect, useState } from "react";
const RADIUS = 50;

export default function App() {
  const [circles, setCircles] = useState([]);
  const drawCircle = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log("x: ", x, " y:", y);
    setCircles((prev) => [...prev, { x, y }]);
  };
  useEffect(() => {
    document.addEventListener("click", drawCircle);

    return () => document.removeEventListener("click", drawCircle);
  }, []);

  const colors = ["lightsalmon", "lightblue", "lightgreen", "lightpink"];

  const findNumberOfIntersections = (circleList, x1, y1) => {
    let noOfIntersect = 0;
    circleList.forEach((circle) => {
      const x2 = circle.x;
      const y2 = circle.y;
      const distanceBetweenTwoPoints = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      );
      if (x1 !== x2 || y1 !== y2) {
        if (distanceBetweenTwoPoints < 2 * RADIUS) noOfIntersect++;
      }
    });
    return noOfIntersect;
  };
  return (
    <div>
      <h1>circle Overlapping</h1>
      {circles.map((coord, index) => {
        const interractions = findNumberOfIntersections(
          circles,
          coord.x,
          coord.y
        );

        return (
          <Canva
            key={index}
            x={coord.x}
            y={coord.y}
            color={colors[interractions]}
            interractions={interractions}
          />
        );
      })}
    </div>
  );
}

const Canva = ({ x, y, color, interractions }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x - RADIUS,
        top: y - RADIUS,
        backgroundColor: color || "red",
        height: `${2 * RADIUS}px`,
        width: `${2 * RADIUS}px`,
        borderRadius: "50%",
        border: "1px solid black",
      }}
    >
      {interractions}
    </div>
  );
};
