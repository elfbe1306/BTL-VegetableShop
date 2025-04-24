import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductModal from '../../components/ProductModal/ProductModal';
import styles from '../ProductDetail/ProductDetail.module.css'

import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { productName } = useParams();
    return (
        <div>
          <Header /> 
          <Footer />
        </div>
      );
}
export default ProductDetail