import React, { useEffect, useState } from "react";
import styles from './PromoBanner.module.css'
import { Link } from 'react-router-dom';
import apiService from "../../api";

const PromoBanner = () => {
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchPromotion();
      setPromotion(response.slice(0,1)[0]);
    };
    
    fetchData();
  }, [])
  

  return(
    <div className={styles.promoBanner}>
      <img src={"http://localhost/BTL-VegetableShop/backend/uploads/promotion/" + promotion.image + "1.png"} alt="" />
      <div className={styles.promoBannerTextContainer}>
        <p className={styles.promoBannerTitle}>{promotion.sale_name}</p>
        <p className={styles.promoBannerDiscount}>{Number(promotion.discount_percentage)}% off</p>
        <Link to="/vegetable">
          <button className={styles.promoBannerButton}>Shop Now ➜</button>
        </Link>
      </div>
    </div>
  )
}

export default PromoBanner;