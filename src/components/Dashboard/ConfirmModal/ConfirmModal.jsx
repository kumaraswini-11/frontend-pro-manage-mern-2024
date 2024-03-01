import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "../..";
import { logOut } from "../../../redux/slices/authenticationSlice";
import { useLogoutMutation } from "../../../redux/api/authenticationApi";
import styles from "./ConfirmModal.module.css";
import { useDeleteTodoMutation } from "../../../redux/api/todoApi";

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  uniqueId = "",
  isDeleteModal = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const [deleteTodo, { isLoading: deletingTodoLoader, isSuccess, isError }] =
    useDeleteTodoMutation();

  const handleLogout = async () => {
    // Prevent multiple logout attempts while it's ongoing
    if (isLoading) return;

    try {
      const res = await logout();
      // console.log(res);

      if (res?.error && res.error.data && res.error.data.message) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data.success) {
        // setShowLogoutModal(false);
        toast.success(res?.data.message);
        dispatch(logOut());
        navigate("/login");
      }
    } catch (error) {
      // console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again later.");
    }
  };

  const handleDeleteTodo = async () => {
    // Implement deleting todo functionality
    // console.log("Todo is deleting", uniqueId);
    const res = await deleteTodo(uniqueId).unwrap();
    console.log(res);
    if (isSuccess) {
      toast("Deleted successfully!");
    }
    if (isError) {
      toast("Having some error try again latter");
    }
    setIsOpen(false);
  };

  const handleAddTodo = async () => {
    // As of now this is useless, because i have added AddEdit Modal there.
    // Implement adding todo functionality
    // console.log("New todo is added to todo section");
  };

  const handleConfirm = () => {
    // Handle confirmation based on modal type
    if (isDeleteModal) {
      handleLogout();
    } else {
      uniqueId ? handleDeleteTodo() : handleAddTodo();
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
