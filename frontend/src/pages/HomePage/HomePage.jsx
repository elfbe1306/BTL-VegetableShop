import React, { useEffect, useState } from 'react'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import BannerBar from '../../components/BannerBar/BannerBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import PromoBanner from '../../components/PromoBanner/PromoBanner';
import styles from './HomePage.module.css'
import apiService from '../../api';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchProduct();
      setProducts(response.slice(0, 4));
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
        <PromoBanner/>
        {products.map((p) => (
          <ProductCard key={p.product_id} product={p}/>
        ))}
      </div>
      
    </div>
  )
}

export default HomePage