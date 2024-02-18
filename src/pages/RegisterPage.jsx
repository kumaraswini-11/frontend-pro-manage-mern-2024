import React from "react";
import { RegisterLoginCommon, RegisterForm } from "../components";
import styles from "../styles/RegisterLogin.module.css";

function RegisterPage() {
  return (
    <div className={styles.registerContainer}>
      {/* Left side */}
      <RegisterLoginCommon />

      {/* Right side */}
      <div className={styles.rightSide}>
        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
