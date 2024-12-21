import React, { useEffect, useState } from 'react';

const Ticket = ({ id }) => {
    const [ ticket, setTicket ] = useState({
        "id": 0,
        "price": 0,
        "ordered_time": "",
        "status": "",
        "booked_by": 0,
        "customer": 0,
        "flight": 0,
        "seat": 0
    });

    useEffect(() => {
        try {
            fetch(`http://localhost:8000/tickets/${id}`, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},
            })
            .then(response => response.json())
            .then(data => {
                setTicket(data);
            })  
        } catch (error) {
            console.error('Error fetching ticket:', error);
        }
    }, [])
    return (
        <div className="ticket">
    <h1>Thông tin vé</h1>
    {ticket && (
        <>
            <div className="ticket-section">
                <span className="ticket-label">ID vé:</span>
                <span className="ticket-value">{ticket.id}</span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Giá vé:</span>
                <span className="ticket-value">{ticket.price} USD</span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Trạng thái thanh toán:</span>
                <span className="ticket-value">{ticket.status}</span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Mã khách hàng:</span>
                <span className="ticket-value">{ticket.customer}</span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Chuyến bay:</span>
                <span className="ticket-value">{ticket.flight}</span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Hạng ghế:</span>
                <span className="ticket-value">
                    {ticket.seat_class === "0"
                        ? "First class"
                        : ticket.seat_class === "1"
                        ? "Business class"
                        : ticket.seat_class === "2"
                        ? "Premium class"
                        : ticket.seat_class === "3"
                        ? "Economy class"
                        : "Không xác định"}
                </span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Vị trí ghế:</span>
                <span className="ticket-value">{ticket.seat_pos}</span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Sân bay đi:</span>
                <span className="ticket-value">
                    {ticket.from_airport_city} ({ticket.from_airport_code})
                </span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Sân bay đến:</span>
                <span className="ticket-value">
                    {ticket.to_airport_city} ({ticket.to_airport_code})
                </span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Thời gian khởi hành:</span>
                <span className="ticket-value">
                    {new Date(ticket.departure_time).toLocaleString()}
                </span>
            </div>
            <div className="ticket-section">
                <span className="ticket-label">Thời gian đến nơi:</span>
                <span className="ticket-value">
                    {new Date(ticket.arrival_time).toLocaleString()}
                </span>
            </div>
        </>
    )}
</div>



    );
};

export default Ticket;