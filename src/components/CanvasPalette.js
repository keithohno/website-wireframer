import React from "react";
import { connect } from "react-redux";
import { createStencil, createWordStencil } from "../redux/actions";

const CanvasPalette = ({ onAddStencil, onAddWordStencil }) => {
  return (
    <React.Fragment>
      <button onClick={onAddStencil}>BOX</button>
      <button onClick={onAddWordStencil}>BOX WITH WORDS</button>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAddStencil: () => {
      dispatch(createStencil());
    },
    onAddWordStencil: () => {
      dispatch(createWordStencil());
    }
  };
};

export default connect(null, mapDispatchToProps)(CanvasPalette);
