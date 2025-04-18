import React from 'react'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import BannerBar from '../../components/BannerBar/BannerBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css'
import PromoBanner1 from '../../assets/images/promo1.png'

const products = [
  {
    id: 1,
    name: 'Chainse Cabbage',
    price: 14.99,
    rating: 4,
    image: "/img/products/ChaniseCabbage.png",
  },
  {
    id: 2,
    name: 'Green Lettuce',
    price: 14.99,
    rating: 4,
    image: '/img/products/GreenLettuce.png',
  },
  {
    id: 3,
    name: 'Green Chili',
    price: 14.99,
    rating: 4,
    image: '/img/products/GreenChili.png',
  },
  {
    id: 4,
    name: 'Corn',
    price: 14.99,
    rating: 4,
    image: '/img/products/Corn.png',
  },
]

function HomePage() {
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
          <ProductCard key={p.id} product={p}/>
        ))}
      </div>
      
    </div>
  )
}

export default HomePage