import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { getFirestore } from "redux-firestore";

const ListScreen = ({ wireframes, onAddCanvas }) => {
  return (
    <React.Fragment>
      {wireframes &&
        wireframes.map(wf => (
          <p>
            <Link to={"/wf/" + wf.index}>{wf.name}</Link>
          </p>
        ))}
      <p>
        <button onClick={onAddCanvas}>Add Canvas</button>
      </p>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { user, firestore } = state;
  return { wireframes: firestore.data.root[user.email].wireframes };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { index } = ownProps.match.params;
  return {
    onAddCanvas: () => {
      dispatch(addCanvasHandler(index));
    }
  };
};

const addCanvasHandler = () => (dispatch, getState) => {
  const firestore = getFirestore();
  const { user } = getState();
  firestore
    .collection("root")
    .doc(user.email)
    .get()
    .then(doc => {
      let data = doc.data();
      data.wireframes.push({
        name: "we love boxes " + (data.wireframes.length + 1),
        width: 400,
        height: 400,
        maxId: -1,
        focus: -1,
        index: data.wireframes.length,
        stencils: []
      });
      firestore
        .collection("root")
        .doc(user.email)
        .set(data);
    });
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "root" }])
)(ListScreen);
