import React, { useState, useRef, useEffect } from 'react';
import style from './search-restaurant.module.css'; // Import the CSS module

const SearchRestaurantPage = () => {
    const mapContainer = useRef(null);
    const [location, setLocation] = useState('');

    const handleInputChange = (value) => setLocation(value);

    const handleSearchRestaurant = () => {
        // Implement your search logic here
        // For example, you can use the 'location' state to perform a search based on user input
        console.log('Searching for restaurants in:', location);
    };

    return (
        <div className={style.searchContainer}>
            <div className={style.inputContainer}>
                <input
                    className={style.input}
                    type='text'
                    value={location}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <button className={style.searchButton} onClick={handleSearchRestaurant}>
                    입력
                </button>
            </div>
            <div className={style.mapContainer} ref={mapContainer} />
        </div>
    );
};

export default SearchRestaurantPage;
