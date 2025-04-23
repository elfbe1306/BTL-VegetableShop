import React, { useEffect, useState } from 'react'

import HomePageHeader from '../../components/HomePageHeader/HomePageHeader'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import BannerBar from '../../components/BannerBar/BannerBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import PromoBanner from '../../components/PromoBanner/PromoBanner';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Review from '../../components/Review/Review';

import styles from './HomePage.module.css'
import apiService from '../../api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await apiService.FetchProduct();
      setProducts(response1.slice(0, 4));

      const response2 = await apiService.FetchReview();
      setReviews(response2);
    }

    fetchData();
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

      <VideoPlayer />

      <div className={styles.customerReviewContainer}>
        <p className={styles.customerReviewTitle}>CLIENT TESTIOMIAL</p>
        <p className={styles.customerReviewSubTitle}>What our Client Says</p>
        <div className={styles.reviewContainer}>
          {reviews.slice(0, windowWidth <= 880 ? 4 : 3).map((r) => (
              <Review key={r.id} review={r} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default HomePage