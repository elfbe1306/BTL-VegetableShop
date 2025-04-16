import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../style/InfoPage.module.css'

function InfoPage() {
  return (
    <div>
      <Header />       
        <div>
            <div className={styles.AboutUs}>
                <div className={styles.Text}>
                    <div className={styles.BoldText}>100% Trusted Organic Food Store</div>
                    <div className={styles.SmallText}>Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae. </div>
                </div>
                <div className={styles.Image}>
                    <img src="/img/About-us-img.png" alt="img" />
                </div>
            </div>
            <div className={styles.AboutMe}>
                <img src="/img/About-me-img.png" alt="img" />
            </div>
        </div>
      <Footer /> 
    </div>
  )
}

export default InfoPage