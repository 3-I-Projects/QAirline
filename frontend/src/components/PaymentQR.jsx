import React from 'react';
import qr from '../assets/qrpng.png';

const PaymentQR = ({ value }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src={qr} width={256} height={256} alt="QR Code" />
            <p>Scan the QR code to proceed with the payment</p>
        </div>
    );
};

export default PaymentQR;