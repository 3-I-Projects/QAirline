// import React, { useState, useEffect } from 'react';

// const AvailableFlights = () => {
//     const [flights, setFlights] = useState([]); // Lưu trữ danh sách chuyến bay
//     const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
//     const [error, setError] = useState(null); // Lưu lỗi (nếu có)

//     // Hàm gọi API
//     const fetchFlights = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             // Gửi yêu cầu đến API
//             const response = await fetch('API_ENDPOINT', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     from_date: '2024-12-01',
//                     to_date: '2024-12-12',
//                     from_airport: 2,
//                     to_airport: 1,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }

//             const data = await response.json();
//             setFlights(data); // Lưu dữ liệu chuyến bay
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchFlights();
//     }, []); // Chỉ chạy một lần khi component được render

//     if (loading) return <p>Đang tải dữ liệu...</p>;
//     if (error) return <p>Lỗi: {error}</p>;

//     return (
//         <div>
//             <h2>Các chuyến bay khả dụng</h2>
//             {flights.length > 0 ? (
//                 <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Thời gian khởi hành</th>
//                             <th>Thời gian đến</th>
//                             <th>Giá vé cơ bản</th>
//                             <th>Điểm đi</th>
//                             <th>Điểm đến</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {flights.map((flight) => (
//                             <tr key={flight.id}>
//                                 <td>{flight.id}</td>
//                                 <td>{new Date(flight.departure_time).toLocaleString()}</td>
//                                 <td>{new Date(flight.arrival_time).toLocaleString()}</td>
//                                 <td>{flight.base_price} USD</td>
//                                 <td>{flight.origin_airport}</td>
//                                 <td>{flight.destination_airport}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>Không có chuyến bay nào khả dụng.</p>
//             )}
//         </div>
//     );
// };

// export default AvailableFlights;

import React, { useState, useEffect } from "react";

const AvailableFlights = ({ from, to, departureDate }) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    // Dữ liệu giả định mô phỏng thông tin chuyến bay
    const allFlights = [
      {
        id: 1,
        from: "Hà Nội",
        to: "TP Hồ Chí Minh",
        departureDate: "2024-12-01",
        price: "100",
      },
      {
        id: 2,
        from: "Hà Nội",
        to: "TP Hồ Chí Minh",
        departureDate: "2024-12-02",
        price: "150",
      },
      {
        id: 3,
        from: "Hà Nội",
        to: "Đà Lạt",
        departureDate: "2024-12-01",
        price: "120",
      },
    ];

    setFlights(allFlights);
  }, []);

  useEffect(() => {
    // Lọc thông tin chuyến bay dựa vào props được truyền
    const results = flights.filter(
      (flight) =>
        flight.from.toLowerCase() === from.toLowerCase() &&
        flight.to.toLowerCase() === to.toLowerCase() &&
        flight.departureDate === departureDate
    );

    setFilteredFlights(results);
  }, [from, to, departureDate, flights]);

  return (
    <div>
      <h1>Danh sách chuyến bay</h1>
      {filteredFlights.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Từ</th>
              <th>Đến</th>
              <th>Ngày khởi hành</th>
              <th>Giá vé (USD)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
                <td>{flight.departureDate}</td>
                <td>{flight.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không tìm thấy chuyến bay phù hợp.</p>
      )}
    </div>
  );
};

export default AvailableFlights;
