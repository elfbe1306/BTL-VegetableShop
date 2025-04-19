import React, { useState } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import PriceSlider from '../components/PriceSlider/PriceSlider'
import RatingFilter from '../components/RatingFilter/RatingFilter'
import "../style/ListProduct.css"; 

function ListProduct() {
  const [ratings, setRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />       
      <main className="home-content">
        <Filter/>
        <div className='main_container'>
          <div>
            <div className='filter_field'>
              <p>Rating</p>
               <RatingFilter selectedRatings={ratings} onChange={setRatings} />
              <p style={{ marginTop: '30px', display: 'block' }}>Price</p>
              <PriceSlider />
            </div>
          </div>

          <div className='product_align'>
            <div className='product'>
              <div className='product_out_of_stock'>Out of stock</div>
              <img src="./img/Potato.png" alt="" />
              <div className='product_description'>
                <div className='product_title'>
                  <span>Big Potatoes</span>
                  <span>$14.99</span>
                  <div className='product_rate'>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-gray"></i>
                  </div>
                </div>
                <i className="ri-shopping-bag-line"/>
              </div>
            </div>

            <div className='product_chosen'>
              <img src="./img/Potato.png" alt="" />
              <div className='product_description'>
                <div className='product_title'>
                  <span className='product_chosen_title'>Big Potatoes</span>
                  <span>$14.99</span>
                  <div className='product_rate'>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-gray"></i>
                    <i class="ri-star-fill star-gray"></i>
                  </div>
                </div>
                <i class="ri-shopping-bag-line bag_chosen"></i>
              </div>
            </div>

            <div className='product'>
              <div className='product_on_sale'>Sale 50%</div>
              <img src="./img/Potato.png" alt="" />
              <div className='product_description'>
                <div className='product_title'>
                  <span>Big Potatoes</span>
                  <div className='product_price'>
                    <span>$14.99</span>
                    <span className='price_before_sale'>$29.98</span>
                  </div>
                  <div className='product_rate'>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-yellow"></i>
                    <i class="ri-star-fill star-gray"></i>
                    <i class="ri-star-fill star-gray"></i>
                    <i class="ri-star-fill star-gray"></i>
                  </div>
                </div>
                <i class="ri-shopping-bag-line"></i>
              </div>
            </div>

          </div>
        </div>
        <Pagination/>
      </main>
      <Footer /> 
    </div>
  )
}

export default ListProduct