import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Filter from '../../components/Filter/Filter'
import Pagination from '../../components/Pagination/Pagination'
import PriceSlider from '../../components/PriceSlider/PriceSlider'
import RatingFilter from '../../components/RatingFilter/RatingFilter'
import styles from "../ListProduct/ListProduct.module.css"; 
import apiService from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';

function ListProduct() {
  const [ratings, setRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchProduct();
      setProducts(response)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Header />       
      <main className="home-content">
        <Filter/>
        <div className={styles.main_container}>
          <div>
            <div className={styles.filter_field}>
              <p>Rating</p>
               <RatingFilter selectedRatings={ratings} onChange={setRatings} />
              <p style={{ marginTop: '30px', display: 'block' }}>Price</p>
              <PriceSlider />
            </div>
          </div>

          <div className={styles.product_align}>
            {products.map((p) => (
              <ProductCard key={p.id || p.name} product={p} />
            ))}
          </div>
        </div>
        <Pagination/>
      </main>
      <Footer /> 
    </div>
  )
}

export default ListProduct