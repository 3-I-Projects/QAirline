import React, { useContext, useState } from 'react';
import Ticket from '../../components/Ticket';
import PaymentForm from '../../components/PaymentForm';
import PaymentButton from '../../components/PaymentButton';
import PaymentQR from '../../components/PaymentQR';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../../context/BookingContext';

const PaymentPage = () => {
    const [ paymentMethod, setPaymentMethod ] = useState('VISA');
    const { tickets, setTickets } = useContext(BookingContext);
    const { accessToken } = useContext(BookingContext);
    const navigate = useNavigate();

    const onClick = () => {
        toast('Payment successful. Redirecting to homepage');
        const headers = {'Content-Type': 'application/json'}
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }
        tickets.forEach((ticket) => {
            fetch('http://localhost:8000/tickets/', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({ ticket }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        });
        navigate('/');
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <p>Welcome to the payment page. Here are your tickets.</p>
            <Ticket />
            <button onClick={() => setPaymentMethod('VISA')}>Card</button>
            <button onClick={() => setPaymentMethod('QR')}>QR</button>
            {paymentMethod === 'VISA' ? (
                <PaymentForm />
            ) : (
                <PaymentQR />
            
            )}
            <PaymentButton onClick={onClick} />
            <Toaster />
        </div>
    );
};

export default PaymentPage;