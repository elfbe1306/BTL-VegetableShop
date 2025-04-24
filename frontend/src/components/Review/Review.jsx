import React from "react";
import styles from "./Review.module.css";
import ReviewIcon from "../../assets/icons/reviewIcon";
import FullStar from "../../assets/icons/FullStar";
import HalfStar from "../../assets/icons/HalfStar";
import NullStar from "../../assets/icons/NullStar";

const Review = ({ review }) => {
    return(
        <div className={styles.reviewContainer}>
            <div>
                <ReviewIcon/>
                <p className={styles.commentText}>{review.comment}</p>
            </div>
            <div className={styles.userRatingContainer}>
                <p>- {review.name} -</p>
                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => {
                    const currentStar = i + 1;

                    if (review.star >= currentStar) {
                        return <FullStar key={i} className={styles.star} />;
                    } else if (review.star >= currentStar - 0.5) {
                        return <HalfStar key={i} className={styles.star} />;
                    } else {
                        return <NullStar key={i} className={styles.nullstar} />;
                    }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Review;