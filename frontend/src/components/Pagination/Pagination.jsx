import React, { useState } from "react";
import styles from "../Pagination/pagination.module.css"; 

const Pagination = () => {
    
  return (
    <div className={styles.pagination}>
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a className={styles.active} href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
    </div>
  );
};

export default Pagination;