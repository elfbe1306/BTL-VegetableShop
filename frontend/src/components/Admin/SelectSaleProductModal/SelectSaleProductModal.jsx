import React from "react";
import styles from './SelectSaleProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";
import { motion } from "framer-motion";
import apiService from "../../../api";

const SelectSaleProductModal = ({ onClose, products, selectedProducts, setSelectedProducts }) => {
  const isSelected = (productId) => {
    return selectedProducts.some((p) => p.product_id === productId);
  };

  // Handle checkbox toggle
  const handleToggle = (product) => {
    if (isSelected(product.product_id)) {
      // Remove from selected
      setSelectedProducts((prev) =>
        prev.filter((p) => p.product_id !== product.product_id)
      );
    } else {
      // Add to selected
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  return(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <table className={styles.table}>
          <thead>
            <tr>
                {["Name", "Price", "Quantity", "Action"].map((head) => (
                <th key={head} className={styles.th}>
                    {head}
                </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return(
                <motion.tr
                  key={product.product_id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                > 
                  <td className={styles.td}>{product.product_name}</td>
                  <td className={styles.td}>${product.product_price}</td>
                  <td className={styles.td}>{product.quantity}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected(product.product_id)}
                      onChange={() => handleToggle(product)}
                      className={styles.checkBox}
                    />
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default SelectSaleProductModal