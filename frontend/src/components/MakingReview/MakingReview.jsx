import React, { useState } from 'react';
import styles from '../MakingReview/MakingReview.module.css';

function MakingReview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const handleReviewPost = () => {
  }

  return (
    <div className={styles.ratingContainer}>
        <div className={styles.stars}>
            {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                key={index}
                className={`${styles.star} ${starValue <= (hover || rating) ? styles.filled : ''}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                >
                ★
                </span>
            );
            })}
        </div>
        <textarea placeholder="Your comment (optional)" value={review} onChange={(e) => setReview(e.target.value)} className={styles.textarea}/>
        <button onClick={handleReviewPost} className={styles.summitbutton}>Post</button>
    </div>
  );
}

export default MakingReview;
