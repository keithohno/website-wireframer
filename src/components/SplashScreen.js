import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
import { loadUser } from "../redux/actions";

const SplashScreen = ({ firebase, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    const credentials = { email, password };
    onLogin({ firebase, credentials, handleError, handleSuccess });
  };

  const handleError = err => {
    setMessage(err);
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  if (success) {
    return <Redirect to={"/wf"} />;
  }

  return (
    <div>
      <p>{message}</p>
      <p>
        <input
          placeholder="email"
          type="text"
          onChange={e => {
            handleChange(e, setEmail);
          }}
        />
      </p>
      <p>
        <input
          placeholder="password"
          type="password"
          onChange={e => {
            handleChange(e, setPassword);
          }}
        />
      </p>
      <button onClick={handleLogin}>Login</button>
      <p>
        <Link to={"/register"}>REGISTER</Link>
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return { firebase: state.firebase };
};

const mapDispatchToProps = dispatch => ({
  onLogin: authData => {
    dispatch(loginHandler(authData));
  }
});

const loginHandler = ({
  credentials,
  firebase,
  handleError,
  handleSuccess
}) => (dispatch, getState) => {
  const { user, firestore } = getState();
  let users = firestore.ordered.root;
  let uuid;
  for (let current of users) {
    if (current.email === user.email) {
      uuid = current.id;
    }
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch(loadUser(credentials.email, uuid));
      handleSuccess();
    })
    .catch(err => {
      handleError(err.message);
    });
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "root" }])
)(SplashScreen);
