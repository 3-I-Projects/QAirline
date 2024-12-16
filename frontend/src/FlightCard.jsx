import React, { useState } from 'react';
import './style/FlightCard.css';

const FlightCard = ({ flight }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flight-card" onClick={toggleDetails}>
      <h4>{`Chuyến bay từ ${flight.origin_airport_city} đến ${flight.destination_airport_city}`}</h4>
      <p>Khởi hành: {new Date(flight.departure_time).toLocaleString()}</p>
      <p>Đến nơi: {new Date(flight.arrival_time).toLocaleString()}</p>
      {showDetails && (
        <div className="flight-card-details">
          <p>Giá vé cơ bản: {flight.base_price} USD</p>
          <p>Điểm đi: {flight.origin_airport}</p>
          <p>Điểm đến: {flight.destination_airport}</p>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
