import React from "react";
import styles from './BannerBar.module.css'
import DeliveryTruckIcon from '../../assets/icons/DeliveryTruckIcon';
import HeadphoneIcon from '../../assets/icons/HeadphoneIcon';
import ShoppingBagIcon from '../../assets/icons/ShoppingBagIcon';
import BoxIcon from '../../assets/icons/BoxIcon';


const BannerBar = () => {

    return(
        <div className={styles.bannerBarContainer}>

            <div className={styles.bannerBarBox}>
                <DeliveryTruckIcon className={styles.icon}/>
                <div className={styles.titleBox}>
                    <p className={styles.title}>Free Shipping</p>
                    <p className={styles.subTitle}>Free shipping with discount</p>
                </div>
            </div>

            <div className={styles.bannerBarBox}>
                <HeadphoneIcon className={styles.icon}/>
                <div className={styles.titleBox}>
                    <p className={styles.title}>Great Support 24/7</p>
                    <p className={styles.subTitle}>Instant access to Contact</p>
                </div>
            </div>

            <div className={styles.bannerBarBox}>
                <ShoppingBagIcon className={styles.icon}/>
                <div className={styles.titleBox}>
                    <p className={styles.title}>100% Secure Payment</p>
                    <p className={styles.subTitle}>We ensure your money is save</p>
                </div>
            </div>

            <div className={styles.bannerBarBox}>
                <BoxIcon className={styles.icon}/>
                <div className={styles.titleBox}>
                    <p className={styles.title}>Money-Back Guarantee</p>
                    <p className={styles.subTitle}>30 days money-back</p>
                </div>
            </div>
        </div>
    )
}

export default BannerBar