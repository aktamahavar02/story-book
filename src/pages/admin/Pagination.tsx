import React from 'react'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalResults,
  perResults = 10
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // Number of pages to show around current page
    
    // Always show first page
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      // Show ellipsis if needed
      if (currentPage > delta + 2) {
        pages.push('...');
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        pages.push(i);
      }
      
      // Show ellipsis if needed
      if (currentPage < totalPages - delta - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    
        <div>
          <p className="text-sm text-gray-700  font-figTree">
            Showing <span className="font-medium">{(currentPage - 1) * perResults + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(totalResults,currentPage * perResults, totalPages * perResults)}
            </span>{' '}
            of <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
         
          <nav
  className="flex items-center justify-center space-x-1 rounded-lg bg-white  p-2"
  aria-label="Pagination"
>
  {/* Previous Button */}
  <button
    onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
    disabled={currentPage === 1}
    className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-150
      ${currentPage === 1
        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 focus:ring-2 focus:ring-indigo-500'
      }`}
  >
    ←
    <span className="sr-only">Previous</span>
  </button>

  {/* Page Numbers */}
  {pageNumbers?.map((page, index) => (
    <button
      key={index}
      onClick={() => typeof page === 'number' && onPageChange(page)}
      disabled={typeof page !== 'number'}
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-150
        ${page === currentPage
          ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-600'
          : typeof page === 'number'
            ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ring-1 ring-gray-300'
            : 'text-gray-400 cursor-default ring-1 ring-gray-200'
        }`}
    >
      {page}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
    disabled={currentPage === totalPages}
    className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-150
      ${currentPage === totalPages
        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 focus:ring-2 focus:ring-indigo-500'
      }`}
  >
    →
    <span className="sr-only">Next</span>
  </button>
</nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination