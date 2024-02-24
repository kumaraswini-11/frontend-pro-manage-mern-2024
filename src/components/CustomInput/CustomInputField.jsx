/* Custom Input field for regisster, login and settings page */

import { forwardRef } from "react";
import registerLoginStyles from "../../styles/RegisterLogin.module.css";
import settingStyles from "../../styles/SettingPage.module.css";

export const InputField = forwardRef(
  (
    { type = "text", leftIcon, rightIcon, isSettingsPage = false, ...rest },
    ref
  ) => {
    let styles = isSettingsPage ? settingStyles : registerLoginStyles;
    return (
      <div className={styles.inputContainer}>
        {leftIcon && (
          <div className={`${styles.icon} ${styles.lockIcon}`}>{leftIcon}</div>
        )}
        <input
          type={type}
          placeholder="Enter Value"
          className={styles.inputField}
          ref={ref} // Pass ref to input element
          {...rest}
        />
        {rightIcon && (
          <div className={`${styles.icon} ${styles.eyeIcon}`}>{rightIcon}</div>
        )}
      </div>
    );
  }
);
