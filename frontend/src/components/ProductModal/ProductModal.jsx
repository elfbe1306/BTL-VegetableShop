import React, { useState, useEffect } from "react"; 
import styles from "./ProductModal.module.css";
import CloseIcon from "../../assets/icons/CloseIcon";
import FullStar from "../../assets/icons/FullStar";
import HalfStar from "../../assets/icons/HalfStar";
import NullStar from "../../assets/icons/NullStar";
import Favorite from "../../assets/icons/Favorite";

import { useCart } from "../../CartContext";

const ProductModal = ({ product, onClose, mode = "modal" }) => {
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

    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);

    const productPrice = 
        product.discount_percentage ? 
        Math.round(product.price * (100 - Number(product.discount_percentage))) / 100 :
        product.price;

    const { addToCart, cartItems } = useCart();

    const handleAddToCart = () => {
        if (count > 0) {
            addToCart(product, count);
            setCount(0);
        }
    };

    useEffect(() => {
        console.log("Cart Items:", cartItems);
    }, [cartItems]);
      

    return (
        <div className={mode === "modal" ? styles.overlay : styles.inlineWrapper}>
            <div className={mode === "modal" ? styles.modal : styles.inlineBox}>
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
                    <div className={styles.rightContainer} style={{marginRight: '30px'}}>
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
                            <span>{product.total_user ? product.total_user : 0} Review</span>
                        </div>
                        <p className={styles.price}>Price: <span className={styles.priceValue}>${productPrice}</span></p>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.quantitycomponent}>
                          <div className={styles.quantitycontainer}>
                            <button onClick={decrement} className={styles.minusbutton}>-</button>
                              <span className={styles.quantitynumber}>{count}</span>
                            <button onClick={increment} className={styles.addbutton}>+</button>
                          </div>
                          <button className={styles.addtocartbutton} onClick={handleAddToCart}>Add to Cart</button>
                          <button className={styles.favoriteButton}>
                            <Favorite/>
                          </button>
                        </div>
                    </div>
                </div>
                {mode === "modal" && (
                    <button className={styles.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductModal;
