import React, { useState } from "react";
// import { getAuth } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const onPasswordChange = (event) => {
    console.log(event);
    const { value } = event.target;
    setPassword(value);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault(); // submit 버튼 클릭시 새로고침 방치
    console.log(event.target.value);

    const auth = getAuth();
    let data;

    if (newAccount) {
      data = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      data = await signInWithEmailAndPassword(auth, email, password);
    }
  };

  const onSocialClick = async (event) => {
    console.log(event);

    const { name } = event.target;
    console.log(name);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="input email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="input password"
          value={password}
          onChange={onPasswordChange}
          required
        ></input>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "sign in"}
        ></input>

        <span onClick={toggleAccount}>
          {newAccount ? "sign in" : "Create Account"}
        </span>
      </form>

      <button onClick={onSocialClick} name="google">
        Google Login
      </button>
      <button onClick={onSocialClick} name="github">
        Github Login
      </button>
      <button onClick={onSocialClick} name="facebook">
        Facebook Login
      </button>
    </div>
  );
};

export default Auth;
