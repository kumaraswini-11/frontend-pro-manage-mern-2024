import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  TiUserOutline,
  RiLock2Line,
  PiEyeLight,
  PiEyeSlashLight,
} from "../utils/iconExports.js";
import { InputField } from "./";
import {
  setCredentials,
  selectUserData,
} from "../redux/slices/authenticationSlice.js";
import { useChangePasswordMutation } from "../redux/api/authenticationApi.js";
import styles from "../styles/SettingPage.module.css";

function Setting() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    oldPassword: "",
    newPassword: "",
  });
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  useEffect(() => {
    setFormData(() => ({
      fullName: userData?.fullName || "",
      oldPassword: "",
      newPassword: "",
    }));
  }, [userData]);

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Name is required";
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await changePassword(formData);
        if (res.error || !res.data?.success) {
          const errorMessage = res.error?.data?.message || "Updation failed.";
          toast.error(errorMessage);
        } else {
          dispatch(setCredentials(res.data.user));
          toast.success(res.data.message || "Password updated successfully.");
        }
      } catch (error) {
        // Handle the error without logging it to the console
        toast.error("Updation failed. Please try again later.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = (type) => {
    if (type === "old") {
      setOldPasswordVisible((prev) => !prev);
    } else if (type === "new") {
      setNewPasswordVisible((prev) => !prev);
    }
  };

  return (
    <div className={styles.mainSubContainer}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.inputContainerGroup}>
          <InputField
            type="text"
            name="fullName"
            leftIcon={<TiUserOutline />}
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
            isSettingsPage={true}
          />
          {errors.fullName && (
            <p className={styles.errorMsg}>{errors.fullName}</p>
          )}
          <InputField
            type={oldPasswordVisible ? "text" : "password"}
            name="oldPassword"
            leftIcon={<RiLock2Line />}
            rightIcon={
              oldPasswordVisible ? (
                <PiEyeLight onClick={() => togglePasswordVisibility("old")} />
              ) : (
                <PiEyeSlashLight
                  onClick={() => togglePasswordVisibility("old")}
                />
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
                <PiEyeLight onClick={() => togglePasswordVisibility("new")} />
              ) : (
                <PiEyeSlashLight
                  onClick={() => togglePasswordVisibility("new")}
                />
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
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Setting;
