import React from "react";
import styles from "./Checkout.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Checkout = () => {

    return(
        <>
            <Header/>
                <div className={styles.CartContainer}>
                    <p className={styles.CartContainerTitle}>My Shopping Cart</p>
                    <div className={styles.MainContainer}>
                        <div className={styles.productContainer}>

                        </div>
                        <div className={styles.totalContainer}>
                            
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}

export default Checkout