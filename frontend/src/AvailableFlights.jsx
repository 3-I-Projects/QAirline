import React from 'react';
import { useLocation } from 'react-router-dom';
import './style/AvailableFlights.css';
import FlightCard from './FlightCard.jsx';

const AvailableFlights = () => {
  const location = useLocation();
  const { flights } = location.state || { flights: [] };

  return (
    <div>
      <header className="header">
        <h2>Menu</h2>
      </header>

      {/* Placeholder cho biểu đồ */}
      <div className="chart-placeholder">
        Biểu đồ sẽ hiển thị ở đây sau này
      </div>

      <div className="flight-list-container">
        <h2 style={{ margin: '10px 0' }}>Chuyến bay khả dụng</h2>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <p>Không có chuyến bay nào khả dụng.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableFlights;
