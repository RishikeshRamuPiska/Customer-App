import React from 'react';
import Button from 'react-bootstrap/Button';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const handleNextPage = () => {
        onPageChange(Math.min(currentPage + 1, totalPages)); 
    };

    const handlePreviousPage = () => {
        onPageChange(Math.max(1, currentPage - 1));
    };

    return (
        <div className="pagination-controls">
            <Button variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </Button>
            <span className="current-page"> Page {currentPage} of {totalPages} </span> 
            <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>
    );
}

export default Pagination;
