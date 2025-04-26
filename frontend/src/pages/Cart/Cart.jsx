import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CloseIcon from "../../assets/icons/CloseIcon";

import { useCart } from "../../CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  console.log(cartItems)

  const productPrice = (discount_percentage, price) => {
      return discount_percentage ? Math.round(price * (100 - Number(discount_percentage))) / 100 : price
  }

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product.price;
      const discount = item.product.discount_percentage 
        ? price * (1 - Number(item.product.discount_percentage) / 100)
        : price;
      return sum + discount * item.quantity;
    }, 0);

    const roundedTotal = Math.round(totalPrice * 100) / 100;
    const shipping = Math.round((roundedTotal * 0.1) * 100) / 100;  
    const final = Math.round(totalPrice * 100 + shipping * 100) / 100;

    setTotalPrice(roundedTotal);
    setShippingFee(shipping);
    setFinalPrice(final);
  }, [cartItems]);

  return(
    <>
      <Header/>

      <div className={styles.CartContainer}>
        <p className={styles.CartContainerTitle}>My Shopping Cart</p>
        <div className={styles.MainContainer}>
            <div className={styles.productContainer}>
              <table>
                <thead>
                  <tr className={styles.columns}>
                    <th className={styles.productColumn}>Product</th>
                    <th className={styles.priceColumn}>Price</th>
                    <th className={styles.quantityColmun}>Quantity</th>
                    <th className={styles.subTotalColumn}>SubTotal</th>
                    <th className={styles.actionColumn}></th>
                  </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.product.product_id}>
                        <td className={styles.productRow}>
                          <img src={"http://localhost/BTL-VegetableShop/backend/uploads/products/" + item.product.image + "1.png"} alt="" />
                          <p>{item.product.name}</p>
                        </td>
                        <td className={styles.priceRow}>{productPrice(item.product.discount_percentage, item.product.price)}</td>
                        <td className={styles.quantityRow}>{item.quantity}</td>
                        <td className={styles.subTotalRow}>{productPrice(item.product.discount_percentage, item.product.price) * item.quantity}</td>
                        <td className={styles.actionRow}>
                          <button onClick={() => removeFromCart(item.product.product_id)}>
                              <CloseIcon className={styles.closeIcon}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className={styles.totalContainer}>
                <p>Cart Total</p>
                <div className={styles.subTotalPriceContainer}>
                  <p>Subtotal</p>
                  <p>${totalPrice}</p>
                </div>
                <div className={styles.ShippingFeeContainer}>
                  <p>Shipping (10%):</p>
                  <p>${shippingFee}</p>
                </div>
                <div className={styles.TotalPriceContainer}>
                  <p>Total:</p>
                  <p>${finalPrice}</p>
                </div>
                <div className={styles.buttonContainer}>
                  <button>Proceed to checkout</button>
                </div>
              </div>
            </div>
        </div>
      </div>

      <Footer/>
    </>
  )
}

export default Cart