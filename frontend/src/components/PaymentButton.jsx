import React from 'react';

const PaymentButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            Pay Now
        </button>
    );
};

export default PaymentButton;