import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "../..";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  uniqueId = "",
  isDeleteModal = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Implement logout functionality
    try {
      // Example: const response = await logout();
      // if (response.data.success) {
      //   dispatch(logoutSuccess());
      toast.success("Logged out successfully.");
      navigate("/login");
      // }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleEditTodo = async () => {
    // Implement editing todo functionality
    console.log("Todo is edited", uniqueId);
  };

  const handleAddTodo = async () => {
    // Implement adding todo functionality
    console.log("New todo is added to todo section");
  };

  const handleConfirm = () => {
    // Handle confirmation based on modal type
    if (isDeleteModal) {
      handleLogout();
    } else {
      uniqueId ? handleEditTodo() : handleAddTodo();
    }
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalWidth={335}>
      {isOpen && (
        <>
          <div className={styles.header}>
            Are you sure you want to {isDeleteModal ? "Logout" : "Delete"}?
          </div>
          <div className={styles.footer}>
            <button onClick={handleConfirm} className={styles.submitButton}>
              Yes, {isDeleteModal ? "Logout" : "Delete"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ConfirmModal;
