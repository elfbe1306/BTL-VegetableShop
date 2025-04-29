import React from "react";
import styles from './AlertModal.module.css';
import CloseIcon from "../../assets/icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import Check from "../../assets/icons/Check"

const AlertModal = ({ message, onClose, redirectPath, redirectText }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectPath);
    onClose(null);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.AlertModalContainer}>
        <p>
          {message}
          {message === "Order placed successfully!" && (
            <Check className={styles.CheckIcon} />
          )}
        </p>
        {redirectPath && (
          <div className={styles.buttonWrapper}>
            <button className={styles.redirectButton} onClick={handleRedirect}>
              {redirectText}
            </button>
          </div>
        )}
        <button className={styles.closeButton} onClick={() => onClose(null)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
