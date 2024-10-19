import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage, perPageArray }) => {
  const [inputPage, setInputPage] = useState('');

  // Handle page input change
  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  // Handle items per page input change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10)); // Use parseInt to convert string to number
  };

  // Handle page jump on enter key press
  const handlePageJump = (e) => {
    if (e.key === 'Enter') {
      goToPage();
    }
  };

  // Function to handle the page change when the "Go" button is clicked
  const goToPage = () => {
    const pageNumber = Math.max(1, Math.min(totalPages, parseInt(inputPage, 10))); // Ensure valid page number
    if (!isNaN(pageNumber)) {
      onPageChange(pageNumber);
    }
    setInputPage('');
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages > maxVisiblePages) {
      if (startPage === 1) {
        endPage = maxVisiblePages;
      } else if (endPage === totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-2">
      {/* First Page and Previous Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 border ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 border ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 border ${currentPage === page ? 'bg-blue-500 text-white' : 'text-blue-600'}`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis for large page ranges */}
      {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2">...</span>}

      {/* Next Page and Last Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 border ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 border ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
      >
        Last
      </button>

      {/* Jump to Page */}
      <input
        type="number"
        value={inputPage}
        onChange={handleInputChange}
        onKeyDown={handlePageJump}
        placeholder="Jump"
        className="px-2 py-1 border rounded w-20 text-center"
      />
      {/* Go Button for page jump */}
      <button
        onClick={goToPage}
        className="px-2 py-1 border text-blue-600"
      >
        Go
      </button>

      {/* Show Per Page */}
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="px-2 py-1 border rounded w-28 text-center"
      >
        {perPageArray && perPageArray.length > 0 && perPageArray.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
