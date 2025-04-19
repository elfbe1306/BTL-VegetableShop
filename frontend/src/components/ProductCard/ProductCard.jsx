import React, { useState } from "react";
import styles from "./ProductCard.module.css"
import FullStar from "../../assets/icons/FullStar";
import HalfStar from "../../assets/icons/HalfStar";
import NullStar from "../../assets/icons/NullStar";
import ShoppingBagLevy from "../../assets/icons/ShoppingBagLevy";
import ProductModal from "../ProductModal/ProductModal";

const ProductCard = ({ product }) => {
    const averageRating = product.total_user > 0 ? product.total_star / product.total_user : 0;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return(
        <div className={styles.productCardContainer}>
            <img src={product.image + "1.png"}/>
            <div className={styles.product_description}>
                <div className={styles.product_title_container}>
                    <p className={styles.product_name}>{product.name}</p>
                    <p className={styles.product_price}>${product.price}</p>
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
                    </div>
                </div>
                <button className={styles.buttonProduct} onClick={handleModalOpen}>
                    <ShoppingBagLevy className={styles.shoppingBag} />
                </button>
                
                {isModalOpen && (
                    <ProductModal product={product} onClose={handleModalClose}/>
                )}
                
            </div>
        </div>
    )
}

export default ProductCard