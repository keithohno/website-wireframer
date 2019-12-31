import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase
} from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  createFirestoreInstance,
  firestoreReducer,
  getFirestore,
  reduxFirestore
} from "redux-firestore";
import { wireframerReducer } from "./redux/reducers/wireframerReducer";
import { userReducer } from "./redux/reducers/userReducer";
import Router from "./Router";

const fbConfig = {
  apiKey: "AIzaSyALES8oMcJmInAU3JNfQMMRyLfCy60b5SI",
  authDomain: "wirefra-7ac45.firebaseapp.com",
  databaseURL: "https://wirefra-7ac45.firebaseio.com",
  projectId: "wirefra-7ac45",
  storageBucket: "wirefra-7ac45.appspot.com",
  messagingSenderId: "653440546912",
  appId: "1:653440546912:web:5b51df11bdc8957323ab05"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  wireframe: wireframerReducer,
  user: userReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebase)
)(createStore)(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

// Setup react-redux so that connect HOC can be used
const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
