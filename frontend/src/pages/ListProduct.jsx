import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import "../style/ListProduct.css"; 

function ListProduct() {

  return (
    <div>
      <Header />       
      <main className="home-content">
        <Filter/>
        <div className='main_container'>
          <div>
            <div className='filter_field'>
              <span>Rating</span>
              <div className='rate_field'>
                <input type="checkbox" id="" name="" value=""/>
                <div>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                </div>
                <span>5.0</span>
              </div>
              <div className='rate_field'>
                <input type="checkbox" id="" name="" value=""/>
                <div>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-gray"></i>
                </div>
                <span>4.0 & up</span>
              </div>
              <div className='rate_field'>
                <input type="checkbox" id="" name="" value=""/>
                <div>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-gray"></i>
                  <i class="ri-star-fill star-gray"></i>
                </div>
                <span>3.0 & up</span>
              </div>
              <div className='rate_field'>
                <input type="checkbox" id="" name="" value=""/>
                <div>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-gray"></i>
                  <i class="ri-star-fill star-gray"></i>
                  <i class="ri-star-fill star-gray"></i>
                </div>
                <span>2.0 & up</span>
              </div>
              <div className='rate_field'>
                <input type="checkbox" id="" name="" value=""/>
                <div>
                  <i class="ri-star-fill star-yellow"></i>
                  <i class="ri-star-fill star-gray"></i>
                  <i class="ri-star-fill star-gray"></i>
                  <i class="ri-star-fill star-gray"></i>
                  <i class="ri-star-fill star-gray"></i>
                </div>
                <span>1.0 & up</span>
              </div>
            </div>
          </div>
          <div className='product_align'>
            <div className='product'>
              <div className='product_status'>Out of stock</div>
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
                  <i class="ri-shopping-bag-line"></i>
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
              <img src="./img/Potato.png" alt="" />
              <div className='product_description'>
                <div className='product_title'>
                  <span>Big Potatoes</span>
                  <span>$14.99</span>
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