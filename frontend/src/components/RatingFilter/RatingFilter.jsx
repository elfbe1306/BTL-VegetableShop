import React from 'react';
import styles from './RatingFilter.module.css';
import FullStar from '../../assets/icons/FullStar';
import NullStar from "../../assets/icons/NullStar";

const ratings = [
  { value: 5, label: '5.0'},
  { value: 4, label: '4.0 & up'},
  { value: 3, label: '3.0 & up'},
  { value: 2, label: '2.0 & up'},
  { value: 1, label: '1.0 & up'}
];

const renderStars = (ratingValue) => {
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FullStar key={`full-${index}`} className={styles.star} />
      ))}
      {halfStar && <FullStar key="half" />}
      {[...Array(emptyStars)].map((_, index) => (
        <NullStar key={`empty-${index}`} className={styles.nullstar} />
      ))}
    </>
  );
};

const RatingFilter = ({ selectedRatings, handleRatingChange }) => (
  <>
    <p className={styles.ratingFilter}>Rating</p>
    {ratings.map((rate) => (
      <div key={rate.value} className={styles.rateField}>
        <input
          type="checkbox"
          value={rate.value}
          checked={selectedRatings.includes(rate.value)}
          onChange={() => handleRatingChange(rate.value)}
        />
        <div>{renderStars(rate.value)}</div>
        <span>{rate.label}</span>
      </div>
    ))}
  </>
);

export default RatingFilter;
