import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from "../ListProduct/ListProduct.module.css"; 
import apiService from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterIcon from '../../assets/icons/FilterIcon';
import FullStar from '../../assets/icons/FullStar';
import NullStar from "../../assets/icons/NullStar";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const getPageNumbers = (totalPages, currentPage) => {
  const maxVisiblePages = 5;
  const pages = [];

  if (totalPages <= maxVisiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(currentPage - 2, 2);
    const right = Math.min(currentPage + 2, totalPages - 1);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};

const ratings = [
  { value: 5, label: '5.0'},
  { value: 4, label: '4.0 & up'},
  { value: 3, label: '3.0 & up'},
  { value: 2, label: '2.0 & up'},
  { value: 1, label: '1.0 & up'}
]

const renderStars = (ratingValue) => {
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FullStar key={`full-${index}`} className={styles.star}/>
      ))}
      {halfStar && <FullStar key="half" />}
      {[...Array(emptyStars)].map((_, index) => (
        <NullStar key={`empty-${index}`} className={styles.nullstar}/>
      ))}
    </>
  );
};

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchProduct();
      setProducts(response)
    }

    fetchData()
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // tuy chinh so san pham moi trang
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const [selectedRatings, setSelectedRatings] = useState([]);
  const handleRatingChange = (value) => {
    setSelectedRatings((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((rating) => rating !== value)
        : [...prevSelected, value]
    );
  };

  const MIN = 0;
  const MAX = 75;
  const [values, setValues] = useState([MIN, MAX]);
  const handlePriceChange = (newValues) => {
    setValues(newValues);
  };

  const filteredProducts = products.filter((product) => {
    const averageRating = product.total_user > 0 ? product.total_star / product.total_user : 0;
    const isRatingMatch =
      selectedRatings.length === 0 || selectedRatings.some((rating) => averageRating >= rating);
    const productPrice = 
      product.discount_percentage ? 
      Math.round(product.price * (100 - Number(product.discount_percentage))) / 100 :
      product.price;
    const isPriceMatch = productPrice >= values[0] && productPrice <= values[1];
  
    return isRatingMatch && isPriceMatch;
  });

  const handleFilter = () => {
    console.log(selectedRatings)
  }

  return (
    <>
      <Header />
        <div className={styles.productContainer}>
          <div className={styles.filterContainer}> 
            <button className={styles.filterButton} onClick={handleFilter}> 
              <p>Filter</p> 
              <FilterIcon className={styles.FilterIcon}/>
            </button>

            <div className={styles.filterTool}>
              <p className={styles.ratingFilter}>Rating</p>
              {ratings.map((rate) => (
                <div key={rate.value} className={styles.rateField}>
                  <input
                    type="checkbox"
                    value={rate.value}
                    checked={selectedRatings.includes(rate.value)}
                    onChange={() => handleRatingChange(rate.value)}
                  />
                  <div>{renderStars(rate.value)}</div>
                  <span>{rate.label}</span>
                </div>
              ))}

              <p>Price</p>
              <div className={styles.price_box}>
                <Slider
                  range
                  min={MIN}
                  max={MAX}
                  step={1}
                  value={values}
                  onChange={handlePriceChange}
                />
                <div style={{ display: 'flex',gap: '10px', marginTop: '10px' }}>
                  <span style={{color:'gray'}}>Price:</span>
                  <span>${values[0]}</span>
                  <span>-</span>
                  <span>${values[1]}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.productAlign}>
              {filteredProducts.slice(startIndex, endIndex).map((p) => (
                <ProductCard key={p.product_id} product={p} />
              ))}
            </div>

            <div className={styles.pagination}>
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className={styles.pagePreviousButton} >&lt;</button>
              {getPageNumbers(totalPages, currentPage).map((page, index) =>
                page === "..." ? (
                  <span key={index} className={styles.ellipsis}>...</span>
                ) : (
                  <button key={index} onClick={() => setCurrentPage(page)} className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}>
                    {page}
                  </button>
                )
              )}
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={styles.pageAfterButton}>&gt;</button>
            </div>
          </div>
        </div>     
      <Footer /> 
    </>
  )
}

export default ListProduct