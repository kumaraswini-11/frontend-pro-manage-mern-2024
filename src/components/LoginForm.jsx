import {
  AiOutlineMail,
  RiLock2Line,
  PiEyeLight,
} from "../utils/iconExports.js";
import styles from "../styles/RegisterLogin.module.css";

function LoginForm() {
  return (
    <div className={styles.subRightSide}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.inputContainerGroup}>
        <div className={styles.inputContainer}>
          <AiOutlineMail className={`${styles.icon} ${styles.oneIcon}`} />
          <input
            type="text"
            placeholder="Email"
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <RiLock2Line className={`${styles.icon} ${styles.lockIcon}`} />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
          />
          <PiEyeLight className={`${styles.icon} ${styles.eyeIcon}`} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.primary}`}
          disabled={false}
        >
          Log in
        </button>
        <p>Have no account yet?</p>
        <button
          className={`${styles.button} ${styles.secondary}`}
          disabled={false}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
