import React, { useState, useEffect } from "react";
import styles from "../Checkout/Checkout.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AlertModal from "../../components/AlertModal/AlertModal";

import { useCart } from "../../CartContext";

import apiService from "../../api";

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        state: "",
        phone: "",
        zip: "",
    });

    const [errors, setErrors] = useState({});
    const { cartItems, clearCart } = useCart();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.zip) newErrors.zip = "Zip code is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if(validateForm()) {
            if(cartItems.length === 0) {
                setDisplayModal(true);
                setResponseMessage("Shopping cart is empty")
                return;
            }

            const userID = localStorage.getItem("userID");

            if(!userID) {
                setDisplayModal(true);
                setResponseMessage("You are required to login to place order");
                return;
            }

            const response = await apiService.CreateCustomerOrder(userID, formData, cartItems);
            setDisplayModal(response.success);
            setResponseMessage(response.message);
            clearCart();

            setFormData({
                name: "",
                address: "",
                state: "",
                phone: "",
                zip: "",
            });
        }
    };

    const productPrice = (discount_percentage, price) => {
        return discount_percentage
            ? Math.round(price * (100 - Number(discount_percentage))) / 100
            : price;
    };

    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            const price = item.product.price;
            const discount = item.product.discount_percentage
                ? price * (1 - Number(item.product.discount_percentage) / 100)
                : price;
            return sum + discount * item.quantity;
        }, 0);

        const roundedTotal = Math.round(total * 100) / 100;
        const shipping = Math.round(roundedTotal * 0.1 * 100) / 100;
        const final = Math.round((total + shipping) * 100) / 100;

        setTotalPrice(roundedTotal);
        setShippingFee(shipping);
        setFinalPrice(final);
    }, [cartItems]);

    const [displayModal, setDisplayModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    return (
        <>
            <Header />
            <div className={styles.maincontainer}>
                <div>
                    <h1>Billing Information</h1>
                    <div className={styles.eachBox}>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <p style={{ color: "red", marginBottom: 10, marginTop: 0 }}>{errors.name}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>Phone Number:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <p style={{ color: "red", marginBottom: 10, marginTop: 0 }}>{errors.phone}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        {errors.address && <p style={{ color: "red", marginBottom: 10, marginTop: 0 }}>{errors.address}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>State:</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                        {errors.state && <p style={{ color: "red", marginBottom: 10, marginTop: 0 }}>{errors.state}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>Zip Code:</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
                        {errors.zip && <p style={{ color: "red", marginBottom: 10, marginTop: 0 }}>{errors.zip}</p>}
                    </div>
                </div>

                <div>
                    <div className={styles.orderSummary}>
                        <h3>Order Summary</h3>
                        {cartItems.map((item) => (
                            <div className={styles.productTotal} key={item.product.product_id}>
                                <div className={styles.productName}>
                                    <img
                                        src={
                                            "http://localhost/BTL-VegetableShop/backend/uploads/products/" +
                                            item.product.image +
                                            "1.png"
                                        }
                                        alt=""
                                    />
                                    <p>{item.product.name}</p>
                                    <p> x{item.quantity}</p>
                                </div>
                                <div className={styles.productPrice}>
                                    ${productPrice(item.product.discount_percentage, item.product.price)}
                                </div>
                            </div>
                        ))}

                        <div className={styles.totalContainer}>
                            <div className={styles.subTotalPriceContainer}>
                                <p style={{ color: "rgb(128, 128, 128)" }}>Subtotal</p>
                                <p>${totalPrice}</p>
                            </div>
                            <div className={styles.ShippingFeeContainer}>
                                <p style={{ color: "rgb(128, 128, 128)" }}>Shipping (10%):</p>
                                <p>${shippingFee}</p>
                            </div>
                            <div className={styles.TotalPriceContainer}>
                                <p style={{ color: "rgb(128, 128, 128)" }}>Total:</p>
                                <p style={{ fontWeight: "500" }}>${finalPrice}</p>
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button onClick={handleSubmit}>Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {displayModal && (
                <AlertModal message={responseMessage} onClose={setDisplayModal}/>
            )}
        </>
    );
};

export default Checkout;
