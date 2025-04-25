import React from 'react';
import styles from './Pagination.module.css';

const getPageNumbers = (totalPages, currentPage) => {
  const maxVisiblePages = 3;
  const pages = [];

  if (totalPages <= maxVisiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(currentPage - 2, 2);
    const right = Math.min(currentPage + 2, totalPages - 1);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  <div className={styles.pagination}>
    <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className={styles.pagePreviousButton}>
      &lt;
    </button>
    {getPageNumbers(totalPages, currentPage).map((page, index) =>
      page === "..." ? (
        <span key={index} className={styles.ellipsis}>...</span>
      ) : (
        <button key={index} onClick={() => setCurrentPage(page)} className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}>
          {page}
        </button>
      )
    )}
    <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={styles.pageAfterButton}>
      &gt;
    </button>
  </div>
);

export default Pagination;
