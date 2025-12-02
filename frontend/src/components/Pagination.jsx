import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  
  // Generate page numbers
  for (let i = 1; i <= Math.min(totalPages, 8); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button 
        className="page-btn prev-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      {totalPages > 8 && (
        <>
          <span className="page-dots">...</span>
          <button className="page-btn">{totalPages}</button>
        </>
      )}
      
      <button 
        className="page-btn next-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}
