import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Signin/signin.module.css";

import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function Signin() {
  const navigate = useNavigate();

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);

    if (auth) {
      navigate("/");
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign in</h2>
      <button onClick={googleSignIn} className={styles.button}>
        Google Sign in
      </button>
    </div>
  );
}
