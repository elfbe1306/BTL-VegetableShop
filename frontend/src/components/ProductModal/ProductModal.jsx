import React, { useState, useEffect } from "react";
import styles from "./ProductModal.module.css";
import CloseIcon from "../../assets/icons/CloseIcon";

const ProductModal = ({ product, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: product.image + "1.png",
        },
        {
            image: product.image + "2.png",
        },
        {
            image: product.image + "3.png",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

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
                        <p>Price: ${product.price}</p>
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
