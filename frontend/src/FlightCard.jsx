import React, { useContext, useState } from "react";
import "./style/FlightCard.css";
import { BookingContext } from "./context/BookingContext";
import toast, { Toaster } from "react-hot-toast";

const FlightCard = ({ flight, chooseFlight }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle hiển thị chi tiết chuyến bay
  const toggleDetails = (e) => {
    e.stopPropagation(); // Ngăn vùng cha kích hoạt click
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="flight-card">
      {/* Phần hiển thị thông tin chuyến bay chính */}
      <div className="flight-infos" onClick={toggleDetails}>
        <h4>{`Chuyến bay từ ${flight.origin_airport_city} đến ${flight.destination_airport_city}`}</h4>
        <p>Khởi hành: {new Date(flight.departure_time).toLocaleString()}</p>
        <p>Đến nơi: {new Date(flight.arrival_time).toLocaleString()}</p>
      </div>

      {/* Hiển thị chi tiết chuyến bay nếu click */}
      {showDetails && (
        <div className="flight-detail">
          <p>
            Chuyến bay từ <strong>{flight.origin_airport_city}</strong> (
            {flight.origin_airport_code}) đến{" "}
            <strong>{flight.destination_airport_city}</strong> (
            {flight.destination_airport_code})
          </p>
          <p>
            Khởi hành lúc:{" "}
            <strong>{new Date(flight.departure_time).toLocaleString()}</strong>
          </p>
          <p>
            Đến nơi lúc:{" "}
            <strong>{new Date(flight.arrival_time).toLocaleString()}</strong>
          </p>
          <p>
            Mã sân bay: {flight.origin_airport_code} ➔{" "}
            {flight.destination_airport_code}
          </p>
          <p>
            Số ghế trống còn lại:{" "}
            <strong>{flight.available_seat_count}</strong>
          </p>
          <p>
            Mã máy bay: <strong>{flight.id}</strong>
          </p>
          <p>
            Thời gian trễ: <strong>{flight.delay} phút</strong>
          </p>
          <button className="book-btn" onClick={chooseFlight}>
            Xác nhận và tiếp tục
          </button>

        </div>
      )}

      <Toaster />
    </div>
  );
};

export default FlightCard;