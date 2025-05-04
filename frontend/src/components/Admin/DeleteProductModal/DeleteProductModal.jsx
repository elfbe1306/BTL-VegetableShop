import React, { useState } from "react";
import styles from './DeleteProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";
import apiService from "../../../api";

const DeleteProductModal = ({ product, onClose, refreshProducts }) => {

  const handleDeleteProduct = async () => {
    const response = await apiService.DeleteProduct(product.product_id, product.name);
    
    if (response.success) {
      await refreshProducts();
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }

  return(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.alertText}>
          Are you sure want to delete <span style={{color: '#f87171'}}>{product.name}</span> ?
        </p>

        <div className={styles.buttonContainer}>
          <button className={styles.YesButton} onClick={handleDeleteProduct}>Yes</button>
          <button className={styles.NoButton} onClick={onClose}>No</button>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default DeleteProductModal;