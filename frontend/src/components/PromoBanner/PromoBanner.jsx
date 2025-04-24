import React from "react";
import styles from './PromoBanner.module.css'
import PromoBanner1 from '../../assets/images/promo1.png';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
    return(
        <div className={styles.promoBanner}>
          <img src={PromoBanner1} alt="" />
          <div className={styles.promoBannerTextContainer}>
            <p className={styles.promoBannerTitle}>SUMMER SALE</p>
            <p className={styles.promoBannerDiscount}>75% off</p>
            <Link to="/vegetable">
              <button className={styles.promoBannerButton}>Shop Now ➜</button>
            </Link>
          </div>
        </div>
    )
}

export default PromoBanner;