import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMail,
  RiLock2Line,
  PiEyeLight,
  PiEyeSlashLight,
} from "../utils/iconExports.js";
import { InputField } from "./";
import styles from "../styles/RegisterLogin.module.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let validationErrors = {};

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
        email: "",
        password: "",
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

  return (
    <div className={styles.subRightSide}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputContainerGroup}>
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
        </div>

        <div className={styles.buttonContainer}>
          {/* onClick submit data */}
          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
          >
            Log in
          </button>
          <p>Don't have an account yet?</p>
          {/* onClick clear data */}
          <button
            type="button"
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => {
              setFormData({
                email: "",
                password: "",
              });
              navigate("/");
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
