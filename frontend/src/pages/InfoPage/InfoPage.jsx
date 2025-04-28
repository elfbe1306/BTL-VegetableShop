import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OurTeam from '../../components/OurTeam/OurTeam';
import Review from '../../components/Review/Review';
import styles from './InfoPage.module.css';

import Sponsor1 from '../../assets/icons/Sponsor1';
import Sponsor2 from '../../assets/icons/Sponsor2';
import Sponsor3 from '../../assets/icons/Sponsor3';
import Sponsor4 from '../../assets/icons/Sponsor4';
import Sponsor5 from '../../assets/icons/Sponsor5';
import Sponsor6 from '../../assets/icons/Sponsor6';

import { PiLeafLight } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { PiTruckLight } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiShoppingBagLight } from "react-icons/pi";
import { PiPackageLight } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import apiService from '../../api';

function InfoPage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [information, setInformation] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

      const response3 = await apiService.FetchInfo();
      setInformation(response3);

    }

    fetchData();
  }, [])

  const handleSubmit = () => {
    navigate('/vegetable'); 
  };
  return (
    <div>
      <Header />       
        <div className={styles.Wrapper}>
            <div className={styles.AboutUs}>
              <div className={styles.Text}>
                {information.length > 0 && (
                  <>
                    <div className={styles.BoldText}>
                      {information[0].title}
                    </div>
                    <div className={styles.SmallText}>
                      {information[0].description}
                    </div>
                  </>
                )}
              </div>
              
                <div className={styles.Image}>
                  {information.length > 0 && (
                    <img src={`http://localhost/BTL-VegetableShop/backend/uploads/${information[0].img}`} alt="img" />
                  )}
                </div>
            </div>
            <div className={styles.AboutMeWrap}>
              <div className={styles.AboutMe}>
                  {information.length > 1 && (
                    <img src={`http://localhost/BTL-VegetableShop/backend/uploads/${information[1].img}`} alt="img" />
                  )}
              </div>
              <div className={styles.TextAndIconWrap}>
                <div className={styles.Text}>
                    {information.length > 1 && (
                      <>
                        <div className={styles.BoldText}>
                          {information[1].title}
                        </div>
                        <div className={styles.SmallText}>
                          {information[1].description}
                        </div>
                      </>
                    )}
                </div>
                <div className={styles.FullIconWrap}>
                    <div className={styles.FirstCol}>
                      <div className={styles.IAndT}>
                        <div className={styles.icon}><PiLeafLight /></div>
                        <div className={styles.IconText}>
                          <div className={styles.IconHeadText}>100% Organic food</div>
                          <div className={styles.IconContentText}>100% healthy & Fresh food.</div>
                        </div>
                      </div>
                      <div className={styles.IAndT}>
                        <div className={styles.icon}><CiStar /></div>
                        <div className={styles.IconText}>
                          <div className={styles.IconHeadText}>Customer Feedback</div>
                          <div className={styles.IconContentText}>Our happy customer</div>
                        </div>
                      </div>
                      <div className={styles.IAndT}>
                        <div className={styles.icon}><PiTruckLight /></div>
                        <div className={styles.IconText}>
                          <div className={styles.IconHeadText}>Free Shipping</div>
                          <div className={styles.IconContentText}>Free shipping with discount</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.SeCol}>
                      <div className={styles.IAndT}>
                        <div className={styles.icon}><TfiHeadphoneAlt /></div>
                        <div className={styles.IconText}>
                          <div className={styles.IconHeadText}>Great Support 24/7</div>
                          <div className={styles.IconContentText}>Instant access to Contact</div>
                        </div>
                      </div>
                      <div className={styles.IAndT}>
                        <div className={styles.icon}><PiShoppingBagLight /></div>
                        <div className={styles.IconText}>
                          <div className={styles.IconHeadText}>100% Sucure Payment</div>
                          <div className={styles.IconContentText}>We ensure your money is save</div>
                        </div>
                      </div>
                      <div className={styles.IAndT}>
                        <div className={styles.icon}><PiPackageLight /></div>
                        <div className={styles.IconText}>
                          <div className={styles.IconHeadText}>100% Organic Food</div>
                          <div className={styles.IconContentText}>100% healthy & Fresh food.</div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div className={styles.DeliveryWrap}>
              <div className={styles.DeText}> 
                <div className={styles.Text}>
                  {information.length > 2 && (
                      <>
                        <div className={styles.BoldText}>
                          {information[2].title}
                        </div>
                        <div className={styles.SmallText}>
                          {information[2].description}
                        </div>
                      </>
                    )}
                </div>
                <div className={styles.CheckText}>
                  <div className={styles.CheckEle}>
                    <div className={styles.icon}><FaCheck /></div>
                    <div className={styles.SmallText}>Enjoy fast and reliable delivery for every order.</div>                
                  </div>
                  <div className={styles.CheckEle}>
                    <div className={styles.icon}><FaCheck /></div>
                    <div className={styles.SmallText}>Fresh, organic products carefully packed for maximum quality.</div>                
                  </div>
                  <div className={styles.CheckEle}>
                    <div className={styles.icon}><FaCheck /></div>
                    <div className={styles.SmallText}>Support your healthy lifestyle with our trusted organic selections.</div>                
                  </div>
                </div>
                <div className={styles.Button} onClick={handleSubmit} style={{ cursor: 'pointer' }}>
                    <div>Shop now</div>
                    <FaArrowRightLong />
                  </div>
              </div>
              <div className={styles.Image}>
                  {information.length > 2 && (
                    <img src={`http://localhost/BTL-VegetableShop/backend/uploads/${information[2].img}`} alt="img" />
                  )}
              </div>
            </div>
            <div className={styles.Teams}>
              <div className={styles.BoldText}>Our Awesome Team</div>
              <div className={styles.SmallText}>Our team is dedicated to delivering fresh organic products with care and passion.</div>
              <OurTeam/>
            </div>
            <div className={styles.customerReviewContainer}>
              <p className={styles.customerReviewTitle}>CLIENT TESTIOMIAL</p>
              <p className={styles.customerReviewSubTitle}>What our Client Says</p>
              <div className={styles.reviewContainer}>
                {reviews.slice(0, windowWidth <= 880 ? 4 : 3).map((r) => (
                  <Review key={r.id} review={r} />
                ))}
              </div>
            </div>
            <div className={styles.sponsorContainer}>
              <Sponsor1 className={styles.sponsorColor}/>
              <Sponsor2 className={styles.sponsorColor}/>
              <Sponsor3 className={styles.sponsorColor}/>
              <Sponsor4 className={styles.sponsorColor}/>
              <Sponsor5 className={styles.sponsorColor}/>
              <Sponsor6 className={styles.sponsorColor}/>
            </div>
        </div>
      <Footer /> 
    </div>
  )
}

export default InfoPage