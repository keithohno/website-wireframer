import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DefaultCanvas from "./components/DefaultCanvas";
import { getFirestore } from "redux-firestore";

const DatabaseTester = () => {
  const handleClear = () => {
    const fireStore = getFirestore();
    fireStore
      .collection("root")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          fireStore
            .collection("root")
            .doc(doc.id)
            .delete();
        });
      });
  };

  const handleReset = () => {
    const fireStore = getFirestore();
    DefaultCanvas.users.forEach(user => {
      fireStore
        .collection("root")
        .doc(user.email)
        .set(
          {
            email: user.email,
            wireframes: user.wireframes
          },
          { merge: true }
        );
    });
  };

  return (
    <div>
      <button onClick={handleClear}>Clear Database</button>
      <button onClick={handleReset}>Reset Database</button>
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    auth: state.firebase.auth,
    firebase: state.firebase
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "root" }])
)(DatabaseTester);
