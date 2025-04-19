import React from "react";
import styles from "./ProductModal.module.css";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.productContainer}>
            <div>
                
            </div>
            <div>
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
            </div>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
