import React, { useState, useEffect } from "react";
import styles from "./ProductModal.module.css";
import CloseIcon from "../../assets/icons/CloseIcon";
import FullStar from "../../assets/icons/FullStar";
import HalfStar from "../../assets/icons/HalfStar";
import NullStar from "../../assets/icons/NullStar";

const ProductModal = ({ product, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "http://localhost/BTL-VegetableShop/backend/uploads/products/" + product.image + "1.png",
        },
        {
            image: "http://localhost/BTL-VegetableShop/backend/uploads/products/" + product.image + "2.png",
        },
        {
            image: "http://localhost/BTL-VegetableShop/backend/uploads/products/" + product.image + "3.png",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const averageRating = product.total_user > 0 ? product.total_star / product.total_user : 0;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.productContainer}>
                    <div className={styles.sliderContainer}>
                        <img src={slides[currentSlide].image}/>
                        
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
                    <div>
                        <h2>{product.name}</h2>
                        <div className={styles.rating}>
                            {[...Array(5)].map((_, i) => {
                            const currentStar = i + 1;
                            if (averageRating >= currentStar) {
                                return <FullStar key={i} className={styles.star} />;
                            } else if (averageRating >= currentStar - 0.5) {
                                return <HalfStar key={i} className={styles.star} />;
                            } else {
                                return <NullStar key={i} className={styles.nullstar} />;
                            }
                            })}
                            <span>4 Review</span>
                        </div>
                        <p className={styles.price}>Price: <span className={styles.priceValue}>${product.price}</span></p>
                    </div>
                </div>
                <button className={styles.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
