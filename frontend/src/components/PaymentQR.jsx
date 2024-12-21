import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import qr from '../assets/qrpng.png';
import AuthContext from "../context/AuthContext";
import { BookingContext } from "../context/BookingContext";

const PaymentQR = ({ value }) => {

    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { ticketIds, setTicketIds } = useContext(BookingContext);

    

    const onClick = () => {
        toast("Thanh toán thành công! Quay trở lại trang chủ.");
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
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src={qr} width={256} height={256} alt="QR Code" />
            <p>Scan the QR code to proceed with the payment</p>
            <button className="submit-button" onClick={onClick}>
                Hoàn thành
              </button>
        </div>
    );
};

export default PaymentQR;