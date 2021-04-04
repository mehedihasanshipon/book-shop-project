import React, { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });
  console.log(user);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signInUser = { ...user };
        signInUser.name = displayName;
        signInUser.email = email;
        signInUser.photo = photoURL;
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <div className="login">
      <div className="d-flex justify-content-center align-items-center google-signIn">
        <button onClick={handleGoogleSignIn} className="btn login-btn">
          {" "}
          <div>
            <img
              src="https://img.icons8.com/cute-clipart/30/000000/google-logo.png"
              alt=""
            />
          </div>
          <h6>Continue with google</h6>
        </button>
      </div>
    </div>
  );
};

export default Login;
