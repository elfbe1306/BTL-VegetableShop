import React, { useEffect, useState } from 'react'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import BannerBar from '../../components/BannerBar/BannerBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css'
import PromoBanner1 from '../../assets/images/promo1.png'
import apiService from '../../api';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchProduct();
      console.log(response)
      setProducts(response)
    }

    fetchData()
  }, [])

  return (
    <div>
      <HomePageHeader />
      <ImageSlider />
      <BannerBar />

      <div className={styles.productTitleContainer}>
        <p className={styles.productTitle}>PRODUCTS</p>
        <p className={styles.productSubTitle}>Our Featured Products</p>
      </div>

      <div className={styles.productFirstRowContainer}>
        <div className={styles.promoBanner}>
          <img src={PromoBanner1} alt="" />
          <div className={styles.promoBannerTextContainer}>
            <p className={styles.promoBannerTitle}>SUMMER SALE</p>
            <p className={styles.promoBannerDiscount}>75% off</p>
            <button className={styles.promoBannerButton}>Shop Now ➜</button>
          </div>
        </div>
        {products.map((p) => (
          <ProductCard key={p.product_id} product={p}/>
        ))}
      </div>
      
    </div>
  )
}

export default HomePage