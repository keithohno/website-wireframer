import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import CanvasStyler from "./CanvasStyler";
import CanvasPalette from "./CanvasPalette";
import Canvas from "./Canvas";
import { setFocus, loadCanvas, changeName } from "../redux/actions";
import { getFirestore } from "redux-firestore";
import { Redirect } from "react-router-dom";

const CanvasRoot = ({ wireframe, onSetFocus, onSave, onChangeName }) => {
  const [canceled, setCanceled] = useState(false);
  const [name, setName] = useState(wireframe.name);
  // make sure state has been loaded at least once already
  const [changed, setChanged] = useState(false);
  const handleChange = event => {
    setChanged(true);
    setName(event.target.value);
    onChangeName(event.target.value);
  };

  let width = wireframe.width;
  let height = wireframe.height;
  let focus = wireframe.focus;
  let stencils = wireframe.stencils;

  if (!wireframe) return null;

  const onCancel = () => {
    setCanceled(true);
  };

  if (canceled) return <Redirect to={"/wf"} />;

  return (
    <div>
      <button onClick={onSave}>SAVE</button>
      <button onClick={onCancel}>CANCEL</button>
      <input
        type="text"
        value={changed ? name : wireframe.name}
        onChange={handleChange}
      />
      <div id="canvas-root">
        <div id="canvas-palette">
          <CanvasPalette />
        </div>
        <div id="canvas-container">
          <div
            style={{
              "min-width": width,
              "max-width": width,
              "min-height": height,
              "max-height": height
            }}
            id="canvas"
            onMouseDown={onSetFocus}
          >
            <Canvas focus={focus} stencils={stencils} />
          </div>
        </div>
        <div id="canvas-styler">
          {focus > -1 ? <CanvasStyler /> : <React.Fragment></React.Fragment>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { index } = ownProps.match.params;
  const { wireframe } = state;
  return {
    wireframe
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { index } = ownProps.match.params;
  dispatch(loadCanvasHandler(index));
  return {
    onSetFocus: () => {
      dispatch(setFocus(-1));
    },
    onSave: () => {
      dispatch(saveCanvasHandler(index));
    },
    onChangeName: newName => {
      dispatch(changeName(newName));
    }
  };
};

const loadCanvasHandler = index => (dispatch, getState) => {
  const firestore = getFirestore();
  const { user } = getState();
  firestore
    .collection("root")
    .doc(user.email)
    .get()
    .then(doc => dispatch(loadCanvas(doc.data().wireframes[index])));
};

const saveCanvasHandler = index => (dispatch, getState) => {
  const firestore = getFirestore();
  const { wireframe, user } = getState();
  firestore
    .collection("root")
    .doc(user.email)
    .get()
    .then(doc => {
      let data = doc.data();
      data.wireframes[index] = wireframe;
      firestore
        .collection("root")
        .doc(user.email)
        .set(data, { merge: true });
    });
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "root" }])
)(CanvasRoot);
