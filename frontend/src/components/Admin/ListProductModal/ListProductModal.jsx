import React from "react";
import styles from './ListProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";

const ListProductModal = ({ onClose, ListProduct }) => {

  return(
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default ListProductModal