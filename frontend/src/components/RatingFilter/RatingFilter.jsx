import React from 'react';
import './RatingFilter.css';

const ratings = [
    { value: 5, label: '5.0', yellow: 5 },
    { value: 4, label: '4.0 & up', yellow: 4 },
    { value: 3, label: '3.0 & up', yellow: 3 },
    { value: 2, label: '2.0 & up', yellow: 2 },
    { value: 1, label: '1.0 & up', yellow: 1 },
  ];
  
  const RatingFilter = ({ selectedRatings = [], onChange }) => {
    const handleCheckboxChange = (value) => {
      const newSelection = selectedRatings.includes(value)
        ? selectedRatings.filter((v) => v !== value)
        : [...selectedRatings, value];
      onChange?.(newSelection);
    };
  
    return (
      <div>
        {ratings.map((rate) => (
          <div className="rate_field" key={rate.value}>
            <input
              type="checkbox"
              value={rate.value}
              checked={selectedRatings.includes(rate.value)}
              onChange={() => handleCheckboxChange(rate.value)}
            />
            <div>
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`ri-star-fill ${
                    index < rate.yellow ? 'star-yellow' : 'star-gray'
                  }`}
                ></i>
              ))}
            </div>
            <span>{rate.label}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default RatingFilter;