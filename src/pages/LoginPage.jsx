import React from "react";
import { RegisterLoginCommon, LoginForm, PageLoader } from "../components";
import styles from "../styles/RegisterLogin.module.css";

function LoginPage() {
  return (
    <div className={styles.registerContainer}>
      {/* Left side */}
      <RegisterLoginCommon />

      {/* Right side */}
      <div className={styles.rightSide}>
        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
