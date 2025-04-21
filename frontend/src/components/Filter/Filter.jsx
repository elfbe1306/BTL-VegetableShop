import React, { useState } from "react";
import styles from "../Filter/filter.module.css"; 

const Filter = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  return (
    <div className={styles.filter_frame}>
      <button className={styles.filter_button}> Filter <i className="styles.ri-equalizer-2-line"></i> </button>
      <div className={styles.sort_frame}>
        <span>Sort by: </span> 
        <select value={selectedOption} onChange={handleChange} className={styles.sort_dropdown}>
          <option value="">Latest</option>
          <option value="price">Lowest</option>
          <option value="name">Highest</option>
        </select>
      </div>
      <div className={styles.filter_result}>
        <span style={{fontWeight:"bold"}}>52</span>
        <span> Results Found</span>
      </div>
    </div>
  );
};

export default Filter;
