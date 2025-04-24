import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductModal from '../../components/ProductModal/ProductModal';
import styles from '../ProductDetail/ProductDetail.module.css';
import apiService from '../../api';

import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productName } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const response = await apiService.FetchProductByName(productName);
        setProduct(response)
      }
  
      fetchData();
    }, [])

    
    return (
        <div>
          <Header /> 
          <ProductModal product={product} mode='inline'></ProductModal>
          <Footer />
        </div>
      );
}
export default ProductDetail