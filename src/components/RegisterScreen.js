import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import { Redirect } from "react-router-dom";

const RegisterScreen = ({ firebase, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    if (password !== password2) {
      setMessage("Passwords are not equal.");
      return;
    }
    const credentials = { email, password };
    onRegister({ credentials, firebase, handleError, handleSuccess });
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
    return <Redirect to={"/"} />;
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
      <p>
        <input
          placeholder="confirm password"
          type="password"
          onChange={e => {
            handleChange(e, setPassword2);
          }}
        />
      </p>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

const mapStateToProps = state => {
  return { firebase: state.firebase };
};

const mapDispatchToProps = dispatch => ({
  onRegister: authData => {
    dispatch(registerHandler(authData));
  }
});

const registerHandler = ({
  credentials,
  firebase,
  handleError,
  handleSuccess
}) => () => {
  const firestore = getFirestore();

  firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      firestore
        .collection("root")
        .doc(credentials.email)
        .set(
          {
            email: credentials.email,
            wireframes: []
          },
          { merge: true }
        );
      handleSuccess();
    })
    .catch(err => {
      handleError(err.message);
    });
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "root" }])
)(RegisterScreen);
