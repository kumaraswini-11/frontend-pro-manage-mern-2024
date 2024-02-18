import { TiUserOutline } from "react-icons/ti";
import { AiOutlineMail } from "react-icons/ai";
import { RiLock2Line } from "react-icons/ri";
import { PiEyeLight } from "react-icons/pi";
import styles from "../styles/RegisterLogin.module.css";

function RegisterForm() {
  return (
    <div className={styles.subRightSide}>
      <h2 className={styles.title}>Register</h2>

      <div className={styles.inputContainerGroup}>
        <div className={styles.inputContainer}>
          <TiUserOutline className={`${styles.icon} ${styles.oneIcon}`} />
          <input type="text" placeholder="Name" className={styles.inputField} />
        </div>
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
            placeholder="Confirm Password"
            className={styles.inputField}
          />
          <PiEyeLight className={`${styles.icon} ${styles.eyeIcon}`} />
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
        <button className={`${styles.button} ${styles.primary}`}>
          Register
        </button>
        <p>Have an account?</p>
        <button className={`${styles.button} ${styles.secondary}`}>
          Log in
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
