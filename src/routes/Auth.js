import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    // const {name, value} = event.target

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // submit()은 클릭과 동시에 새로고침됨.

    const auth = getAuth();

    let data;
    if (newAccount) {
      data = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      data = await signInWithEmailAndPassword(auth, email, password);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  // https://firebase.google.com/docs/auth?hl=ko
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    const auth = getAuth();

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          className="authInput"
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span className="auth_click" onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div className="authBtns">
        <button className="authBtn" onClick={onSocialClick} name="google">
          Continue with Google
        </button>

        <button className="authBtn" onClick={onSocialClick} name="google">
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};
export default Auth;
