import React, { useEffect, useState } from "react";
import styles from './ImageSlider.module.css';

import slider1 from '../../assets/images/homebanner1.png'
import slider2 from '../../assets/images/homebanner2.jpg'
import slider3 from '../../assets/images/homebanner3.jpg'

const slides = [
    {
        image: slider1,
        title: 'Fresh & Healthy Organic Food',
        subtitle: "SALE UP TO",
        discount: "48%",
        button: "Shop now "
    },
    {
        image: slider2,
        title: "Eat Green, Live Clean",
        subtitle: "SALE UP TO",
        discount: "35%",
        button: "Explore now ",
    },
    {
        image: slider3,
        title: "The Best Organic Choices",
        subtitle: "SALE UP TO",
        discount: "50%",
        button: "Buy now ",
    },
]

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return(
        <div className={styles.sliderContainer}>
            <img src={slides[currentSlide].image}/>

            <div className={styles.content}>
                <p className={styles.contentTitle}>{slides[currentSlide].title}</p>
                <p className={styles.contentSubTitle}>{slides[currentSlide].subtitle}</p>
                <p className={styles.contentDiscount}>
                    {slides[currentSlide].discount} 
                    <span className={styles.contentDiscountText}>OFF</span>
                </p>
                <button className={styles.contentButton}>{slides[currentSlide].button} ➜</button>
            </div>

            <div className={styles.dots}>
                {slides.map((_, index) => (
                <span
                    key={index}
                    className={index === currentSlide ? styles.active : ""}
                    onClick={() => setCurrentSlide(index)}
                />
                ))}
            </div>
        </div>
    )

}

export default ImageSlider