import React, { useState } from "react";
import "./style/FlightCard.css";

const FlightCard = ({ flight }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle hiển thị chi tiết chuyến bay
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
<<<<<<< HEAD
    <div className="flight-card">
      {/* Phần hiển thị thông tin chính */}
      <div className="flight-summary" onClick={toggleDetails}>
        <div className="summary-info">
          <p>
            <span className="label">Khởi hành:</span>{" "}
            <span className="value">
              {new Date(flight.departure_time).toLocaleString()} từ{" "}
              {flight.origin_airport_city} ({flight.origin_airport_code})
            </span>
          </p>
          <p>
            <span className="label">Đến nơi:</span>{" "}
            <span className="value">
              {new Date(flight.arrival_time).toLocaleString()} tại{" "}
              {flight.destination_airport_city} ({flight.destination_airport_code})
            </span>
          </p>
          <p>
            <span className="label">Giá vé:</span>{" "}
            <span className="value">{parseFloat(flight.base_price).toLocaleString()} USD</span>
          </p>
          <p>
            <span className="label">Ghế trống:</span>{" "}
            <span className="value">{flight.available_seat_count}</span>
          </p>
        </div>
      </div>

      {/* Toggle chi tiết chuyến bay */}
=======
    <div className="flight-card" onClick={toggleDetails}>
      <h4>{`Chuyến bay từ ${flight.origin_airport_city} đến ${flight.destination_airport_city}`}</h4>
      <p>Khởi hành: {new Date(flight.departure_time).toLocaleString()}</p>
      <p>Đến nơi: {new Date(flight.arrival_time).toLocaleString()}</p>
>>>>>>> c550f1b70f110432f8698935eb3b2a7b5dad7616
      {showDetails && (
        <div className="flight-details">
          <p>
            Chuyến bay từ <strong>{flight.origin_airport_city}</strong> ({flight.origin_airport_code}) đến{" "}
            <strong>{flight.destination_airport_city}</strong> ({flight.destination_airport_code})
          </p>
          <p>
            Khởi hành lúc: <strong>{new Date(flight.departure_time).toLocaleString()}</strong>
          </p>
          <p>
            Đến nơi lúc: <strong>{new Date(flight.arrival_time).toLocaleString()}</strong>
          </p>
          <p>
            Mã sân bay: {flight.origin_airport_code} ➔ {flight.destination_airport_code}
          </p>
          <p>
            Số ghế trống còn lại: <strong>{flight.available_seat_count}</strong>
          </p>
          <p>
            Mã máy bay: <strong>{flight.plane}</strong>
          </p>
          <p>
            Thời gian trễ: <strong>{flight.delay} phút</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
