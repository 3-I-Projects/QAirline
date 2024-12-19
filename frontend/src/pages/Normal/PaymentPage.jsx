import React, { useContext, useState } from "react";
import Ticket from "../../components/Ticket";
import PaymentQR from "../../components/PaymentQR";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../../context/BookingContext";
import Menu from "../../Menu";
import "../../style/Payment.css";

// Thêm các ảnh tương ứng với các loại thẻ
import visaImage from "../../assets/visa.png";
import mastercardImage from "../../assets/mastercard.png";
import amexImage from "../../assets/amex.png";
import AuthContext from "../../context/AuthContext";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [selectedCard, setSelectedCard] = useState(""); // Lưu trạng thái thẻ đang chọn
  const { ticketIds, setTicketIds } = useContext(BookingContext);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  const onClick = () => {
    toast("Payment successful. Redirecting to homepage");
    const headers = { "Content-Type": "application/json" };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    };

    ticketIds.forEach(ticketId => {
        fetch(`http://localhost:8000/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({ status: 'PAID' })
        })
        .then(response => response.json())
        .then(data => {
            toast.success("Success: ", data.id)
        })
    });

    // tickets.forEach((ticket) => {
    //   fetch("http://localhost:8000/tickets/", {
    //     method: "PUT",
    //     headers: headers,
    //     body: JSON.stringify({ ticket }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // });
    navigate("/");
  };

  return (
    <div className="payment-page-container">

            <div className="menu">
              <Menu />
            </div>

      <div className="payment-page">
      
        {/* {ticketIds.map(ticketId => {
            return <Ticket key={ticketId} id={ticketId} />
        })} */}
      <h1>Payment Page</h1>
      <p>Welcome to the payment page. Below are your tickets:</p>

      <div className="section-title">Ticket Component</div>
      <div className="payment-buttons">
        <button onClick={() => setPaymentMethod("CARD")}>Card Payment</button>
        <button onClick={() => setPaymentMethod("QR")}>QR Payment</button>
      </div>

      <div className="section-title">Payment Method</div>

      {paymentMethod === "CARD" && (
        <div className="card-selection-section">
          <div className="card-options">
            <button
              className={`card-btn ${selectedCard === "visa" ? "active" : ""}`}
              onClick={() => handleCardSelection("visa")}
            >
              <img src={visaImage} alt="Visa" />
            </button>
            <button
              className={`card-btn ${selectedCard === "mastercard" ? "active" : ""}`}
              onClick={() => handleCardSelection("mastercard")}
            >
              <img src={mastercardImage} alt="Mastercard" />
            </button>
            <button
              className={`card-btn ${selectedCard === "amex" ? "active" : ""}`}
              onClick={() => handleCardSelection("amex")}
            >
              <img src={amexImage} alt="Amex" />
            </button>
          </div>

          {selectedCard && (
            <div className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="password" placeholder="123" />
              </div>
              <button className="submit-button" onClick={onClick}>
                Pay Now
              </button>
            </div>
          )}
        </div>
      )}

      {paymentMethod === "QR" && <PaymentQR />}
      <Toaster />
    </div>
    </div>
    
  );
};

export default PaymentPage;
