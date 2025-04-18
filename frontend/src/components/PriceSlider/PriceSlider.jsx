import React, { useState } from 'react';
import "../PriceSlider/PriceSlider.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceSlider = () => {
  const MIN = 0;
  const MAX = 300;

  const [values, setValues] = useState([MIN, MAX]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className='price_box'>
      <Slider
        range
        min={MIN}
        max={MAX}
        step={10}
        value={values}
        onChange={handleChange}
      />
      <div style={{ display: 'flex',gap: '10px', marginTop: '10px' }}>
        <span style={{color:'gray'}}>Price:</span>
        <span>${values[0]}</span>
        <span>-</span>
        <span>${values[1]}</span>
      </div>
    </div>
  );
};

export default PriceSlider;

