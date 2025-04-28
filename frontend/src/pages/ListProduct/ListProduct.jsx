import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from "../ListProduct/ListProduct.module.css"; 
import apiService from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterIcon from '../../assets/icons/FilterIcon';

import RatingFilter from '../../components/RatingFilter/RatingFilter';
import PriceFilter from '../../components/PriceFilter/PriceFilter';
import Pagination from '../../components/PaginationProduct/Pagination';

import { useParams } from 'react-router';

const ListProduct = () => {
  const { searchText } = useParams();

  // Fetch Products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchProduct();
      setProducts(response)
    }

    fetchData()
  }, [])

  // Rating Filter
  const [selectedRatings, setSelectedRatings] = useState([]);
  const handleRatingChange = (value) => {
    setSelectedRatings((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((rating) => rating !== value)
        : [...prevSelected, value]
    );
  };

  // Price Filter
  const MIN = 0;
  const MAX = 75;
  const [values, setValues] = useState([MIN, MAX]);
  const handlePriceChange = (newValues) => {
    setValues(newValues);
  };


  // Filter Product
  const filteredProducts = products.filter((product) => {
    const averageRating = product.total_user > 0 ? product.total_star / product.total_user : 0;
    const isRatingMatch =
      selectedRatings.length === 0 || selectedRatings.some((rating) => averageRating >= rating);
    const productPrice = 
      product.discount_percentage ? 
      Math.round(product.price * (100 - Number(product.discount_percentage))) / 100 :
      product.price;
    const isPriceMatch = productPrice >= values[0] && productPrice <= values[1];
  
    const isSearchMatch = !searchText || (
      product.name &&
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    return isRatingMatch && isPriceMatch && isSearchMatch;
  });
  

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // tuy chinh so san pham moi trang
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFilter = () => {
    console.log(selectedRatings)
  }

  return (
    <>
      <Header />
        <div className={styles.productContainer}>
          <div className={styles.filterContainer}> 
            <button className={styles.filterButton} onClick={() => setIsModalOpen(prev => !prev)}> 
              <p>Filter</p> 
              <FilterIcon className={styles.FilterIcon}/>
            </button>

            {/* Filter panel visible on large screens */}
            <div className={styles.desktopOnly}>
              <RatingFilter selectedRatings={selectedRatings} handleRatingChange={handleRatingChange} />
              <PriceFilter values={values} handlePriceChange={handlePriceChange} MIN={MIN} MAX={MAX} />
            </div>

            {/* Filter modal for small screens */}
            {isModalOpen && (
              <div className={styles.mobileFilter}>
                <RatingFilter selectedRatings={selectedRatings} handleRatingChange={handleRatingChange} />
                <PriceFilter values={values} handlePriceChange={handlePriceChange} MIN={MIN} MAX={MAX} />
              </div>
            )}

          </div>

          <div>
            {filteredProducts.length === 0 ? (
              <p className={styles.noProduct}>No products was found.</p>
            ) : (
              <div className={styles.productAlign}>
                {filteredProducts.slice(startIndex, endIndex).map((p) => (
                  <ProductCard key={p.product_id} product={p} />
                ))}
              </div>
            )}

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
          </div>
        </div>
      <Footer /> 
    </>
  )
}

export default ListProduct