import React from "react";
import { connect } from "react-redux";
import { Rnd } from "react-rnd";
import { moveStencil, resizeStencil, setFocus } from "../redux/actions";
import Handle from "./Handle";

const Stencil = ({
  id,
  focus,
  layout,
  style,
  content,
  onMoveStencil,
  onResizeStencil,
  onSetFocus
}) => {
  return (
    <Rnd
      default={{
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height
      }}
      style={{
        backgroundColor: style.backgroundColor,
        border: "solid",
        borderColor: style.borderColor,
        borderWidth: style.borderWidth,
        borderRadius: style.borderRadius
      }}
      bounds={"parent"}
      onDragStop={(_, data) => {
        onMoveStencil(id, data.x, data.y);
      }}
      onResizeStop={(_, __, ___, rdelta, pos) => {
        onResizeStencil(id, pos.x, pos.y, rdelta.width, rdelta.height);
      }}
      resizeHandleComponent={
        focus
          ? {
              topRight: <Handle />,
              topLeft: <Handle />,
              bottomRight: <Handle />,
              bottomLeft: <Handle />
            }
          : null
      }
      onResizeStart={() => {
        onSetFocus(id);
      }}
      onMouseDown={event => {
        onSetFocus(id);
        event.stopPropagation();
      }}
    >
      {content}
    </Rnd>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onMoveStencil: (id, newX, newY) => {
      dispatch(moveStencil(id, newX, newY));
    },
    onResizeStencil: (id, newX, newY, newWidth, newHeight) => {
      dispatch(resizeStencil(id, newX, newY, newWidth, newHeight));
    },
    onSetFocus: id => {
      dispatch(setFocus(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Stencil);
