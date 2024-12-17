import React, { useContext, useState } from "react";
import "./style/FlightCard.css";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./context/BookingContext";
import toast, { Toaster } from "react-hot-toast";

const FlightCard = ({ flight, setFlight }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { customerCount } = useContext(BookingContext);

  // Toggle hiển thị chi tiết chuyến bay
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const chooseFlight = () => {
    if (flight.available_seat_count < customerCount) {
      toast("there isn't enough seats on this flight");
    } else {
      setFlight(flight);
      navigate('/detail');
    }
  }

  return (
    <div className="flight-card" onClick={toggleDetails}>
      <h4>{`Chuyến bay từ ${flight.origin_airport_city} đến ${flight.destination_airport_city}`}</h4>
      <p>Khởi hành: {new Date(flight.departure_time).toLocaleString()}</p>
      <p>Đến nơi: {new Date(flight.arrival_time).toLocaleString()}</p>
      {showDetails && (
        <>
          <div className="flight-details">
            <p>
              Chuyến bay từ <strong>{flight.origin_airport_city}</strong> (
              {flight.origin_airport_code}) đến{" "}
              <strong>{flight.destination_airport_city}</strong> (
              {flight.destination_airport_code})
            </p>
            <p>
              Khởi hành lúc:{" "}
              <strong>
                {new Date(flight.departure_time).toLocaleString()}
              </strong>
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
              Mã máy bay: <strong>{flight.plane}</strong>
            </p>
            <p>
              Thời gian trễ: <strong>{flight.delay} phút</strong>
            </p>
          </div>
          <button onClick={chooseFlight}>Xác nhận và tiếp tục</button>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default FlightCard;
