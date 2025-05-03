import React, { useState } from "react";
import styles from './EditProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";

const EditProductModal = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity)

  return(
    <div className={styles.overlay}> 
      <div className={styles.modal}>
        <div style={{paddingTop: 15}}>
          <div className={styles.insertContainer}>
            <p>Product Name:</p>
            <input type="text" value={name} />
          </div>
          <div className={styles.insertContainer}>
            <p>Price:</p>
            <input type="text" value={price} />
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default EditProductModal