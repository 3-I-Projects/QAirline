import React, { useState, useEffect } from 'react';

const AvailableFlights = () => {
  const [flights, setFlights] = useState([]); // Lưu thông tin chuyến bay
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  // Hàm fetch data từ API
  const fetchFlights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/flights/find', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_date: '2024-12-01',
          to_date: '2024-12-12',
          from_airport: 2,
          to_airport: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status}`);
      }

      const data = await response.json();
      setFlights(data); // Lưu dữ liệu
    } catch (error) {
      console.error("Lỗi trong khi gọi API", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // Render thông báo trạng thái loading
  if (loading) return <p>Đang tải dữ liệu...</p>;
  
  // Hiển thị thông báo lỗi
  if (error) return <p>Lỗi: {error}</p>;

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
