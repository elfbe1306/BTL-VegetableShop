import React from "react";
import styles from "./ProductCard.module.css"

const ProductCard = ({ product }) => {
    return(
        <div className={styles.productCardContainer}>
            <img src={product.image}/>
        </div>
    )
}

export default ProductCard