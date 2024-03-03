import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable'; 
import SearchForm from './components/SearchForm'; 
import Pagination from './components/Pagination'; 
import './App.css';

function App() {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCustomers = async () => { 
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:7000/customers', {
                params: {
                    page: currentPage,
                    search: searchQuery,
                    sort_by: sortBy,
                }
            });
            setCustomers(response.data.rows);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error); 
        } finally {
            setIsLoading(false);
        }
    };
    fetchCustomers(); 
    }, [currentPage, searchQuery, sortBy]); 

    const handleSearchQueryUpdate = (newSearchQuery) => {
      setSearchQuery(newSearchQuery);
    }
  
    const handleSortUpdate = (newSortBy) => {
      setSortBy(newSortBy);
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='app-container'>
        <div className="search-and-table-container">
            <h2 className='customer-directory-heading' I>Customer Directory</h2>            
            <SearchForm
                 onSearchQueryChange={handleSearchQueryUpdate}           
                    onSortChange={handleSortUpdate}   
            /> 
            {isLoading ? <p>Loading...</p> : <CustomerTable customers={customers} />}
        </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages}
                onPageChange={handlePageChange} 
            /> 
        </div>    
    );
}

export default App;
