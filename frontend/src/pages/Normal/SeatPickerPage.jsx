import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { BookingContext } from '../../context/BookingContext';
import AuthContext from '../../context/AuthContext';
import Menu from '../../Menu';

const SeatPickerPage = () => {
    const navigate = useNavigate();
    const { flight, allCustomers, customerCount, ticketIds, setTicketIds } = useContext(BookingContext);
    const { accessToken } = useContext(AuthContext);
    const [ seats, setSeats ] = useState([]); // huan dung ttin torng nay de tao giao dien chon cho ngoi
    const [ selectedSeats, setSelectedSeats ] = useState([]);
    // useEffect(() => {
    //     setSelectedSeats(Array(customerCount).fill({id: ""}));
    // }, [])


    // console.log(allCustomers);
    useEffect(() => {
        allCustomers.forEach((customer) => {
            toast.success("Gửi thông tin thành công, id: " + customer.id);
            // console.log(customer);
        });

        fetch(`http://localhost:8000/flights/flights/${flight.id}/seats`)
        .then(response => response.json())
        .then(data => {
            setSeats(data);
            console.log(seats);
        })
    }, []);

    const onClick = async () => {
        // if (selectedSeats.length === allCustomers.length) {
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }
        for (let i = 0; i < customerCount; i++) {
            const data = {
                "customer": allCustomers[i].id,
                "flight": flight.id,
                "seat": selectedSeats.length > 0 ? selectedSeats[i].id : ''
            }
            console.log(data);
            fetch('http://localhost:8000/tickets/', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                setTicketIds((prevTicketIds) => [...prevTicketIds, data.id]);
                toast.success("Success: ", data.id);
                console.log(ticketIds);
            })
            .catch(error => {
                toast.error("Error: " + error.message);
                console.error(error);
            });
            // sleep to avoid race condition of the database side
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        navigate('/payment');
    }
    return (
        <div>
            <div className="menu">
                <Menu />
            </div>
            <h1>Seat Picker</h1>
            <button onClick={onClick}>
                Đi tiếp
            </button>
            <Toaster />
        </div>
    );
};

export default SeatPickerPage;