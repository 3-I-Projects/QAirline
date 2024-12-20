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
        <div className='ticket'>
            <h1>Vé</h1>
            {ticket && (
                <>
                    <div>ID vé: {ticket.id}</div>
                    <div>Giá vé: {ticket.price}</div>
                    <div>Trạng thái thanh toán: {ticket.status}</div>
                    <div>Mã khách hàng: {ticket.customer}</div>
                    <div>Chuyến bay: {ticket.flight}</div>
                    <div>Vị trí ghế ngồi: {ticket.seat}</div>
                </>
            )}
        </div>
    );
};

export default Ticket;