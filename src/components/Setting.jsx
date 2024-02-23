import {
  TiUserOutline,
  RiLock2Line,
  PiEyeLight,
} from "../utils/iconExports.js";
import styles from "../styles/SettingPage.module.css";

function Setting() {
  return (
    <div className={styles.mainSubContainer}>
      <h2 className={styles.title}>Settings</h2>

      <div className={styles.inputContainerGroup}>
        <div className={styles.inputContainer}>
          <TiUserOutline className={`${styles.icon} ${styles.oneIcon}`} />
          <input type="text" placeholder="Name" className={styles.inputField} />
        </div>
        <div className={styles.inputContainer}>
          <RiLock2Line className={`${styles.icon} ${styles.lockIcon}`} />
          <input
            type="password"
            placeholder="Old Password"
            className={styles.inputField}
          />
          <PiEyeLight className={`${styles.icon} ${styles.eyeIcon}`} />
        </div>
        <div className={styles.inputContainer}>
          <RiLock2Line className={`${styles.icon} ${styles.lockIcon}`} />
          <input
            type="password"
            placeholder="New Password"
            className={styles.inputField}
          />
          <PiEyeLight className={`${styles.icon} ${styles.eyeIcon}`} />
        </div>

        <button className={`${styles.button} ${styles.primary}`}>Update</button>
      </div>
    </div>
  );
}

export default Setting;
