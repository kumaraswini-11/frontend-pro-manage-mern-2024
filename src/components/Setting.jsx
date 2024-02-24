import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TiUserOutline,
  RiLock2Line,
  PiEyeLight,
  PiEyeSlashLight,
} from "../utils/iconExports.js";
import { InputField } from "./";
import styles from "../styles/SettingPage.module.css";

function Setting() {
  const [formData, setFormData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.oldPassword.trim()) {
      validationErrors.oldPassword = "Old Password is required";
    } else if (formData.oldPassword.length < 6) {
      validationErrors.oldPassword =
        "Old Password must be at least 6 characters";
    }
    if (!formData.newPassword.trim()) {
      validationErrors.newPassword = "New Password is required";
    } else if (formData.newPassword.length < 6) {
      validationErrors.newPassword =
        "New Password must be at least 6 characters";
    }
    return validationErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear any previous error for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Reset form fields
      setFormData({
        ...formData,
        oldPassword: "",
        newPassword: "",
      });
      // Clear any previous errors
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.mainSubContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Settings</h2>

        <div className={styles.inputContainerGroup}>
          <InputField
            type="text"
            name="name"
            leftIcon={<TiUserOutline />}
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            isSettingsPage={true}
          />
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
          <InputField
            type={oldPasswordVisible ? "text" : "password"}
            name="oldPassword"
            leftIcon={<RiLock2Line />}
            rightIcon={
              oldPasswordVisible ? (
                <PiEyeLight onClick={toggleOldPasswordVisibility} />
              ) : (
                <PiEyeSlashLight onClick={toggleOldPasswordVisibility} />
              )
            }
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            isSettingsPage={true}
          />
          {errors.oldPassword && (
            <p className={styles.errorMsg}>{errors.oldPassword}</p>
          )}
          <InputField
            type={newPasswordVisible ? "text" : "password"}
            name="newPassword"
            leftIcon={<RiLock2Line />}
            rightIcon={
              newPasswordVisible ? (
                <PiEyeLight onClick={toggleNewPasswordVisibility} />
              ) : (
                <PiEyeSlashLight onClick={toggleNewPasswordVisibility} />
              )
            }
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            isSettingsPage={true}
          />
          {errors.newPassword && (
            <p className={styles.errorMsg}>{errors.newPassword}</p>
          )}

          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Setting;
