import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './PriceFilter.module.css';

const PriceFilter = ({ values, handlePriceChange, MIN , MAX }) => (
  <div className={styles.price_box}>
    <Slider
      range
      min={MIN}
      max={MAX}
      step={1}
      value={values}
      onChange={handlePriceChange}
    />
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <span style={{ color: 'gray' }}>Price:</span>
      <span>${values[0]}</span>
      <span>-</span>
      <span>${values[1]}</span>
    </div>
  </div>
);

export default PriceFilter;
