import React, { useState, useEffect } from "react";

import styles from "../Checkout/Checkout.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useCart } from "../../CartContext";


const Checkout = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        state: "",
        phone: "",
        zip: "",
      });
    
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        state: "",
        phone: "",
        zip: "",
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
        }
    };

    const { cartItems } = useCart();

    return(
        <>
        <Header/>
        <div className={styles.maincontainer}>
            <div>
                <h1>Billing Infomation</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.eachBox}>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>Phone Number:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
                        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
                    </div>
                    
                    <div className={styles.eachBox}>
                        <label>Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>State:</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange}/>
                        {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
                    </div>

                    <div className={styles.eachBox}>
                        <label>Zip Code:</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange}/>
                        {errors.zip && <p style={{ color: "red" }}>{errors.zip}</p>}
                    </div>
                </form>
            </div>

            <div>
                <h3>Order Summary</h3>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Checkout