import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TiUserOutline,
  AiOutlineMail,
  RiLock2Line,
  PiEyeLight,
  PiEyeSlashLight,
} from "../utils/iconExports.js";
import { InputField } from "./";
import { useRegisterMutation } from "../redux/api/authenticationApi.js";
import styles from "../styles/RegisterLogin.module.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Name is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
        const res = await register(formDataWithoutConfirmPassword);
        console.log(res);
        if (res.error && res.error.data && res.error.data.message) {
          toast.error(res.error.data.message);
        } else if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        // console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again later.");
      }
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
            name="fullName"
            leftIcon={<TiUserOutline />}
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className={styles.errorMsg}>{errors.fullName}</p>
          )}
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
          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <p>Have an account?</p>
          <button
            type="button"
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => {
              setFormData({
                fullName: "",
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
