import React, { useEffect, useState } from "react";
import styles from './ImageSlider.module.css';
import apiService from "../../api";
import { Link } from "react-router";

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiService.FetchPromotion();
            setSlides(response.slice(0, 3));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const current = slides[currentSlide] || {};

    return (
        <div className={styles.sliderContainer}>
            <img src={current.image ? `http://localhost/BTL-VegetableShop/backend/uploads/promotion/${current.image}2.png`: ""} alt="Slide" />

            <div className={styles.content}>
                <p className={styles.contentTitle}>{current.description || ""}</p>
                <p className={styles.contentSubTitle}>SALE UP TO</p>
                <p className={styles.contentDiscount}>
                    {current.discount_percentage ? Number(current.discount_percentage) : 0}%
                    <span className={styles.contentDiscountText}> OFF</span>
                </p>
                <button className={styles.contentButton}>
                    <Link className={styles.contentButtonText} to={`/vegetable`}>
                        <p>Explore now ➜</p>
                    </Link>
                </button>
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
    );
};

export default ImageSlider;
