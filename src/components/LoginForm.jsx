import { AiOutlineMail } from "react-icons/ai";
import { RiLock2Line } from "react-icons/ri";
import { PiEyeLight } from "react-icons/pi";
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
        <button className={`${styles.button} ${styles.primary}`}>Log in</button>
        <p>Have no account yet?</p>
        <button className={`${styles.button} ${styles.secondary}`}>
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
