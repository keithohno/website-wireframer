import React from "react";
import Stencil from "./Stencil";

const Canvas = ({ focus, stencils }) => {
  return (
    <React.Fragment>
      {stencils &&
        stencils.map(stencil => (
          <Stencil
            type={stencil.type}
            id={stencil.id}
            key={stencil.id}
            focus={stencil.id === focus}
            content={stencil.content ? stencil.content : ""}
            layout={{
              width: stencil.layout.width,
              height: stencil.layout.height,
              x: stencil.layout.x,
              y: stencil.layout.y
            }}
            style={{
              backgroundColor: stencil.style.backgroundColor,
              borderColor: stencil.style.borderColor,
              borderWidth: stencil.style.borderWidth,
              borderRadius: stencil.style.borderRadius
            }}
          />
        ))}
    </React.Fragment>
  );
};

export default Canvas;
