import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './InfoPage.module.css'
import { PiLeafLight } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { PiTruckLight } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiShoppingBagLight } from "react-icons/pi";
import { PiPackageLight } from "react-icons/pi";

function InfoPage() {
  return (
    <div>
      <Header />       
        <div className={styles.Wrapper}>
            <div className={styles.AboutUs}>
                <div className={styles.Text}>
                    <div className={styles.BoldText}>100% Trusted Organic Food Store</div>
                    <div className={styles.SmallText}>Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae. </div>
                </div>
                <div className={styles.Image}>
                    <img src="src/assets/images/About-us-img.png" alt="img" />
                </div>
            </div>
            <div className={styles.AboutMeWrap}>
              <div className={styles.AboutMe}>
                <img src="src/assets/images/About-me-img.png" alt="img" />  
              </div>
              <div className={styles.TextAndIconWrap}>
                <div className={styles.Text}>
                    <div className={styles.BoldText}>100% Trusted Organic Food Store</div>
                    <div className={styles.SmallText}>Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat. </div>
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
            <div className={styles.Delivery}>
                  <div className={styles.Image}>
                      <img src="src/assets/images/About-us-img.png" alt="img" />
                  </div>
              </div>
        </div>
      <Footer /> 
    </div>
  )
}

export default InfoPage