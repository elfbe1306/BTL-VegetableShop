import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductModal from '../../components/ProductModal/ProductModal';
import MakingReview from '../../components/MakingReview/MakingReview';
import ProductCard from '../../components/ProductCard/ProductCard';
import Review from '../../components/Review/Review';
import styles from '../ProductDetail/ProductDetail.module.css';
import apiService from '../../api';

import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productName } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const response1 = await apiService.FetchProductByName(productName);
        setProduct(response1)

        const response2 = await apiService.FetchProduct();
        setProducts(response2.slice(0, 5));

        const response3 = await apiService.FetchReview();
        setReviews(response3);
      }
  
      fetchData();
    }, [])

    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    return (
        <div>
          <Header /> 
          <ProductModal product={product} mode='inline'></ProductModal>
          <div className={styles.customerfb}>
            <h3>Customer Feedback</h3>
          </div>

          <MakingReview />
          <div className={styles.reviewContainer}>
            {reviews.slice(0, windowWidth <= 880 ? 4 : 3).map((r) => (
              <Review key={r.id} review={r} />
            ))}
          </div>
          
          <div className={styles.customerfb}>
            <h3>Related Product</h3>
          </div>
          <div className={styles.productFirstRowContainer}>
            {products.map((p) => (
            <ProductCard key={p.product_id} product={p}/>
          ))}
          </div>
          <Footer />
        </div>
      );
}
export default ProductDetail