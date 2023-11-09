import React from "react";
import styles from "./styles.module.scss";
import SignInBox from "../../components/SignIn";
const { signinContainer } = styles;

function Signin() {
  return (
    <div className={signinContainer}>
      <SignInBox />
    </div>
  );
}

export default Signin;
