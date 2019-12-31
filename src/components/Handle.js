import React from "react";

const size = 10;

const Handle = () => {
  return (
    <div
      style={{
        "min-width": size,
        "max-width": size,
        "min-height": size,
        "max-height": size,
        border: "1px solid black",
        backgroundColor: "white",
        transform: `translate(${size / 2}px, ${size / 2}px)`
      }}
    ></div>
  );
};

export default Handle;
