import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import './style/AvailableFlights.css';
import FlightCard from './FlightCard.jsx';

const AvailableFlights = () => {
  const [flights, setFlights] = useState([]);
  const location = useLocation();
  
  const { flights: apiFlights } = location.state || {};

  useEffect(() => {
    if (apiFlights) {
      console.log("Dữ liệu từ API:", apiFlights);
      setFlights(apiFlights);
    } else {
      toast.error("Không có dữ liệu chuyến bay từ API.");
    }
  }, [apiFlights]);

  return (
    <div className='available-flights'>
      <header className="header">
        <p>Menu</p>
      </header>
      <div className='chart-placeholder'>
        <p>Biểu đồ sẽ hiện ở đây (nếu có)</p>
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
