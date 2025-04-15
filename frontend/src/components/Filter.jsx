import React, { useState } from "react";
import "../style/filter.css"; 

const Filter = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  return (
    <div className="filter_frame">
      <button className="filter_button"> Filter <i className="ri-equalizer-2-line"></i> </button>
      <div className="sort_frame">
        <span>Sort by: </span> 
        <select value={selectedOption} onChange={handleChange} className="sort_dropdown">
          <option value="">Latest</option>
          <option value="price">Lowest</option>
          <option value="name">Highest</option>
        </select>
      </div>
      <div className="filter_result">
        <span style={{fontWeight:"bold"}}>52</span>
        <span> Results Found</span>
      </div>
    </div>
  );
};

export default Filter;
