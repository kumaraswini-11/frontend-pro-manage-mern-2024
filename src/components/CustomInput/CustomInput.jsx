/* Custom Input field for dashboard, add and edit modals, and share page */

import { FaTrash } from "../../utils/iconExports.js";
import styles from "./CustomInput.module.css";

// CustomInput component
// Renders a checkbox input and a text input with optional delete icon
// Props:
// - value: text value of the input
// - checked: boolean value indicating whether checkbox is checked
// - onCheckboxChange: function to handle checkbox change event
// - onTextInputChange: function to handle text input change event
// - isDelete: boolean value indicating whether to show delete icon (default: false)
// - onDelete: function to handle delete icon click event
const CustomInput = ({
  value,
  checked,
  onCheckboxChange,
  onTextInputChange,
  isDelete = false,
  onDelete = () => {},
}) => {
  return (
    <div className={styles.customInputContainer}>
      {/* Input container containing checkbox and text input */}
      <div className={styles.inputContainer}>
        {/* Checkbox input */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheckboxChange}
          className={styles.checkboxInput}
        />
        {/* Text input */}
        <input
          type="text"
          value={value}
          onChange={onTextInputChange}
          className={styles.textInput}
        />
      </div>
      {/* Delete icon (optional) */}
      {isDelete && <FaTrash onClick={onDelete} className={styles.deleteIcon} />}
    </div>
  );
};

export default CustomInput;
