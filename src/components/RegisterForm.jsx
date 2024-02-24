import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TiUserOutline,
  AiOutlineMail,
  RiLock2Line,
  PiEyeLight,
  PiEyeSlashLight,
} from "../utils/iconExports.js";
import { InputField } from "./";
import styles from "../styles/RegisterLogin.module.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // Clear any previous errors
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.subRightSide}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>

        <div className={styles.inputContainerGroup}>
          <InputField
            type="text"
            name="name"
            leftIcon={<TiUserOutline />}
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
          <InputField
            type="email"
            name="email"
            leftIcon={<AiOutlineMail />}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
          <InputField
            type={passwordVisible ? "text" : "password"}
            name="password"
            leftIcon={<RiLock2Line />}
            rightIcon={
              passwordVisible ? (
                <PiEyeLight onClick={togglePasswordVisibility} />
              ) : (
                <PiEyeSlashLight onClick={togglePasswordVisibility} />
              )
            }
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className={styles.errorMsg}>{errors.password}</p>
          )}
          <InputField
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            leftIcon={<RiLock2Line />}
            rightIcon={
              confirmPasswordVisible ? (
                <PiEyeLight onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <PiEyeSlashLight onClick={toggleConfirmPasswordVisibility} />
              )
            }
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMsg}>{errors.confirmPassword}</p>
          )}
        </div>

        <div className={styles.buttonContainer}>
          {/* onclick submit data */}
          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
          >
            Register
          </button>
          <p>Have an account?</p>
          {/* onclick clear data */}
          <button
            type="button"
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
              navigate("/login");
            }}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
