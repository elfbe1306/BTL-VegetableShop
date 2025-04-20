import React from "react";
import styles from "./ProductModal.module.css";
import FullStar from "../../assets/icons/FullStar";
import HalfStar from "../../assets/icons/HalfStar";
import NullStar from "../../assets/icons/NullStar";

const ProductModal = ({ product, onClose }) => {
  const averageRating = product.total_user > 0 ? product.total_star / product.total_user : 0;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.productContainer}>
            <div></div>
            {/* code ở đây nào */}
            <div> 
              <div>
                
              </div>
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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
