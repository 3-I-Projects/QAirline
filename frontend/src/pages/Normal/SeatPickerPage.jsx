import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { BookingContext } from '../../context/BookingContext';

const SeatPickerPage = () => {
    const navigate = useNavigate();
    const { allCustomers } = useContext(BookingContext);

    console.log(allCustomers);
    useEffect(() => {
        allCustomers.forEach((customer) => {
            toast.success("Gửi thông tin thành công, id: " + customer.id);
            console.log(customer);
        });
    }, []);
    return (
        <div>
            <h1>Seat Picker</h1>
            <button onClick={() => navigate('/payment')}>
                Đi tiếp
            </button>
            <Toaster />
        </div>
    );
};

export default SeatPickerPage;