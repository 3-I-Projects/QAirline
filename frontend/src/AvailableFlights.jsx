import React from 'react';
import { useLocation } from 'react-router-dom';

const AvailableFlights = () => {
  const location = useLocation();
  const { flights } = location.state || { flights: [] }; // Lấy thông tin từ state truyền sang

  return (
    <div>
      <h2>Các chuyến bay khả dụng</h2>
      {flights.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Thời gian khởi hành</th>
              <th>Thời gian đến</th>
              <th>Giá vé cơ bản</th>
              <th>Điểm đi</th>
              <th>Điểm đến</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{new Date(flight.departure_time).toLocaleString()}</td>
                <td>{new Date(flight.arrival_time).toLocaleString()}</td>
                <td>{flight.base_price} USD</td>
                <td>{flight.origin_airport}</td>
                <td>{flight.destination_airport}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có chuyến bay nào khả dụng.</p>
      )}
    </div>
  );
};

export default AvailableFlights;
