import React, { useRef } from "react";
import { FaTrash } from "../../utils/iconExports.js";
import styles from "./CustomInput.module.css";

const CustomInput = React.forwardRef(
  (
    {
      value,
      checked,
      onCheckboxChange,
      onTextInputChange,
      isDelete = false,
      onDelete = () => {},
      checkboxDisabled = false,
      textInputDisabled = false,
      ...props
    },
    ref
  ) => {
    // Create separate refs for checkbox and text input
    const checkboxRef = useRef(null);
    const textInputRef = useRef(null);

    // Styles for disabled inputs
    const disabledInputStyle = {
      cursor: "not-allowed",
      // opacity: 0.5,
    };

    return (
      <div className={styles.customInputContainer}>
        <div className={styles.inputContainer}>
          {/* Checkbox input */}
          <input
            type="checkbox"
            checked={checked}
            onChange={onCheckboxChange}
            className={styles.checkboxInput}
            style={checkboxDisabled ? disabledInputStyle : null}
            disabled={checkboxDisabled}
            {...props}
            ref={checkboxRef}
          />
          {/* Text input */}
          <input
            type="text"
            value={value}
            onChange={onTextInputChange}
            className={styles.textInput}
            style={textInputDisabled ? disabledInputStyle : null}
            disabled={textInputDisabled}
            {...props}
            ref={textInputRef}
          />
        </div>
        {/* Delete icon if required */}
        {isDelete && (
          <FaTrash onClick={onDelete} className={styles.deleteIcon} />
        )}
      </div>
    );
  }
);

export default CustomInput;
