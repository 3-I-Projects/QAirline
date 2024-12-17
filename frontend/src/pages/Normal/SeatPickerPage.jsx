import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { BookingContext } from '../../context/BookingContext';

const SeatPickerPage = () => {
    const navigate = useNavigate();
    const { flight, allCustomers } = useContext(BookingContext);
    const [ seats, setSeats ] = useState([]);
    const [ selectedSeats, setSelectedSeats ] = useState([]);


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
    const onClick = () => {
        // if (selectedSeats.length === allCustomers.length) {
        navigate('/payment');
        // } else {

        // }
    }
    return (
        <div>
            <h1>Seat Picker</h1>
            <button onClick={onClick}>
                Đi tiếp
            </button>
            <Toaster />
        </div>
    );
};

export default SeatPickerPage;