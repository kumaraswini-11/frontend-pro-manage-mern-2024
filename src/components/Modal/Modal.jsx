import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, setIsOpen, modalWidth, children }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  // Render the modal only if it's open
  return isOpen
    ? // Create a portal to render the modal outside the normal DOM hierarchy
      createPortal(
        // Background overlay, clicking it will close the modal
        <div
          onClick={handleClose}
          className={`${styles.modalBackground} ${isOpen ? "" : styles.hidden}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.modalContent}
            style={{
              width: `${modalWidth}px`,
              padding: modalWidth > 400 ? "30px" : undefined,
            }}
          >
            {/* {/* Children should be passed in the format:
          <Modal.Header>Header Component</Modal.Header>
          <Modal.Body>Body Component</Modal.Body>
          <Modal.Footer>Footer Component</Modal.Footer> /}
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { onClose: handleClose });
              }
              return child;
            })} */}

            {/* Simple format*/}
            {children}
          </div>
        </div>,
        document.getElementById("portal")
      )
    : null;
}
