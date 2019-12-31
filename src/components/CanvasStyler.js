import React from "react";
import { connect } from "react-redux";
import TextField from "./TextField";
import { editStencil } from "../redux/actions";

const CanvasStyler = ({ style, onEditStencil }) => {
  return (
    <React.Fragment>
      <TextField
        onChange={event => {
          onEditStencil(event.target.value, null, null, null);
        }}
        defaultValue={style.backgroundColor}
      />
      <TextField
        onChange={event => {
          onEditStencil(null, event.target.value, null, null);
        }}
        defaultValue={style.borderColor}
      />
      <TextField
        onChange={event => {
          onEditStencil(null, null, parseInt(event.target.value, 10), null);
        }}
        defaultValue={style.borderWidth}
      />
      <TextField
        onChange={event => {
          onEditStencil(null, null, null, parseInt(event.target.value, 10));
        }}
        defaultValue={style.borderRadius}
      />
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onEditStencil: (
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius
    ) => {
      dispatch(
        editStencil(backgroundColor, borderColor, borderWidth, borderRadius)
      );
    }
  };
};

const mapStateToProps = state => {
  const { wireframe } = state;
  let style = wireframe.stencils[wireframe.focus].style;
  return { style };
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasStyler);
