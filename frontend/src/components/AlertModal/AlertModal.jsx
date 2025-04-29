import React from "react";
import styles from './AlertModal.module.css';
import CloseIcon from "../../assets/icons/CloseIcon";

const AlertModal = ({ message, onClose }) => {
  return(
    <div className={styles.overlay}>
      <div className={styles.AlertModalContainer}>
        <p>{message}</p>

        <button className={styles.closeButton} onClick={() => onClose(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default AlertModal;