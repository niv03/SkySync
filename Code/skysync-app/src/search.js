import React, { useState } from 'react';

const Search = ({ onLocationChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Optionally, you can add logic to perform search or autocomplete suggestions
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLocationChange(searchTerm);
    // Call the onLocationChange function passed from the parent component (App.js)
    // You might want to convert searchTerm into a location object {lat, lon} if required
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleInputChange} 
        placeholder="Enter city name" 
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
