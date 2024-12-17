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
        <div>
            <h1>Ticket Component</h1>
            {ticket && (
                <>
                    <div>Id: {ticket.id}</div>
                    <div>Price: {ticket.price}</div>
                    <div>Status: {ticket.status}</div>
                    <div>For: {ticket.customer}</div>
                    <div>Flight: {ticket.flight}</div>
                    <div>Seat: {ticket.seat}</div>
                </>
            )}
        </div>
    );
};

export default Ticket;