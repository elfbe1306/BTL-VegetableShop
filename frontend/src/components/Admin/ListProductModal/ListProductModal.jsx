import React, { useEffect, useState } from "react";
import styles from './ListProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";

const ListProductModal = ({ onClose, ListProducts }) => {
  const [ListProduct, setListProduct] = useState(ListProducts);

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const total = ListProduct.reduce((sum, item) => {
      return sum + item.product_price * item.quantity;
    }, 0); 

    const roundedTotal = Math.round(total * 100) / 100;
    const shipping = Math.round(roundedTotal * 0.1 * 100) / 100;
    const final = Math.round((roundedTotal + shipping) * 100) / 100;

    setTotalPrice(roundedTotal);
    setShippingFee(shipping);
    setFinalPrice(final);
  }, [ListProduct]);

  return(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          {ListProduct.map((item) => (
            <div className={styles.productTotal}>
              <p className={styles.productName}>{item.product_name} x {item.quantity}</p>
              <p className={styles.productPrice}>{item.product_price}</p>
            </div>
          ))}

          <div className={styles.totalContainer}>
            <div className={styles.subTotalPriceContainer}>
              <p style={{ color: "rgb(0, 178, 7)" }}>Subtotal</p>
              <p style={{color: 'black'}}>${totalPrice}</p>
            </div>
            <div className={styles.ShippingFeeContainer}>
              <p style={{ color: "rgb(0, 178, 7)" }}>Shipping (10%):</p>
              <p style={{color: 'black'}}>${shippingFee}</p>
            </div>
            <div className={styles.TotalPriceContainer}>
              <p style={{ color: "rgb(0, 178, 7)" }}>Total:</p>
              <p style={{ fontWeight: "500", color: 'black' }}>${finalPrice}</p>
            </div>
          </div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default ListProductModal