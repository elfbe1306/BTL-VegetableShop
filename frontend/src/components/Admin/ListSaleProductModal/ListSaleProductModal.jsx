import React from "react";
import styles from "./ListSaleProductModal.module.css";
import CloseIcon from "../../../assets/icons/CloseIcon";

const ListSaleProductModal = ({ onClose, ListProduct, Discount_Percentage }) => {

  return(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.ListProduct}>
          <h3>List Product</h3>
          {ListProduct.map((item) => {
            const productPrice = Math.round(item.product_price * (100 - Number(Discount_Percentage))) / 100;
            return(
              <div className={styles.productContainer} key={item.product_id}>
                <p className={styles.productName}>{item.product_name} x {item.quantity}</p>
                <div className={styles.priceContainer}>
                  <p className={styles.productPrice}>{item.product_price}</p>
                  <p className={styles.salePrice}>{productPrice}</p>
                </div>
              </div>
            )
          })}
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>  
    </div>
  )
}

export default ListSaleProductModal;