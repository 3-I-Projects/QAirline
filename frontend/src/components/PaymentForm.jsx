import React from 'react';

const PaymentForm = () => {
    return (
        <div>
            <h1>Payment Method</h1>
            {/* Add your payment method form or details here */}
        <form>
            <div>
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div>
                <label htmlFor="cardName">Name on Card</label>
                <input type="text" id="cardName" name="cardName" required />
            </div>
            <div>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
            </div>
            <div>
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" required />
            </div>
        </form>
        </div>
    );
};

export default PaymentForm;