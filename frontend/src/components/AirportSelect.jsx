import React, { useState, useEffect } from 'react';

const AirportSelect = ({ value, onChange }) => {
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        try {
            fetch('http://localhost:8000/flights/airports')
            .then(response => response.json())
            .then(data => {
                setAirports(data);
            })  
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    }, []);

    return (
        <div>
            <label htmlFor="airport-select">Select an Airport:</label>
            <select id="airport-select" value={value} onChange={onChange}>
                <option value="">--Please choose an option--</option>
                {airports.length > 0 ? (
                    airports.map((airport) => (
                        <option key={airport.id} value={airport.id}>
                            {airport.code} - {airport.name}
                        </option>
                    ))
                ) : (
                    <option value="">Loading airports...</option>
                )}
            </select>
        </div>
    );
};

export default AirportSelect;