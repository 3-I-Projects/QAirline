import React from 'react';
import qr from '../assets/money.png';

const PaymentQR = ({ value }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src={qr} size={256} />
            <p>Scan the QR code to proceed with the payment</p>
        </div>
    );
};

export default PaymentQR;