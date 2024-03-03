import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function SearchForm({ onSearchQueryChange, onSortChange }) {
    const [searchInput, setSearchInput] = useState('');
    const [selectedSort, setSelectedSort] = useState('created_at');

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearchQueryChange(searchInput);
        onSortChange(selectedSort);
    };

    return (
        <Form onSubmit={handleSubmit} className="search-form">
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search by name or location"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className='form-control'
                />
                <Form.Select value={selectedSort} onChange={handleSortChange} className='form-select'>
                    <option value="created_at">Date/Time</option> 
                    <option value="date">Date Only</option> 
                    <option value="time">Time Only</option> 
                </Form.Select>
                <Button variant="primary" type="submit" className="search-button">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchForm;
