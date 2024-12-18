import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const CustomerDetail = () => {
    const location = useLocation();
    const { user: customer } = location.state;
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [flights, setFlights] = useState([]);

    const fetchTickets = async () => {
        try {
            const response = await fetch('http://localhost:8000/tickets/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });

            const res = await response.json();
            let userTickets = res.filter((ticket) => ticket.booked_by === customer.id);
            setTickets(userTickets);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchFlights = async () => {
        try {
            const response = await fetch('http://localhost:8000/flights/flights', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });

            const res = await response.json();
            setFlights(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchTickets();
        fetchFlights();
    }, []);

    return (
        <div>
            <h2>{customer.username}'s tickets</h2>
            <table>
                <thead>
                    <tr>
                        <th>Flight</th>
                        <th>Seat</th>
                        <th>Price</th>
                        <th>Ordered Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => {
                        const flight = flights.find((flight) => flight.id === ticket.flight);
                        return(
                        <tr key={ticket.id}>
                            <td>{flight ? `${flight.origin_airport_city} to ${flight.destination_airport_city}` : 'Flight not found'}</td>
                            <td>{ticket.seat}</td>
                            <td>{ticket.price}</td>
                            <td>{ticket.ordered_time}</td>
                            <td>{ticket.status}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>Number of booked tickets: {tickets.filter((ticket) => ticket.status === 'Booked').length}</div>
            <div>Number of cancelled tickets: {tickets.filter((ticket) => ticket.status === 'Cancelled').length}</div>
            <div>Number of paid tickets: {tickets.filter((ticket) => ticket.status === 'Paid').length}</div>
        </div>
    )
}

export default CustomerDetail