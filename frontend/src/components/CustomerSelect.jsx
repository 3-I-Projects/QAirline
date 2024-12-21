import React, { useEffect, useState } from 'react';

const CustomerSelect = ({ accessToken, value, onChange }) => {
    const [customers, setCustomers] = useState([]);
    
    useEffect(() => {
        try {
            const headers = { "Content-Type": "application/json" };
            if (accessToken) {
                headers["Authorization"] = `Bearer ${accessToken}`;
            }
            fetch('http://localhost:8000/users/info', {
                headers: headers
            })
            .then(response => response.json())
            .then(data => {
                setCustomers(data.customers);
            })  
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    }, []);

    return (
        <div className='a'>
            <label htmlFor="customer-select">Chọn: ‎ </label>
            <select name='id' id="customer-select" value={value.id} onChange={onChange}>
                <option value="">-- Chọn hành khách cũ --</option>
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))
                ) : (
                    <option value="">Đang tải hành khách</option>
                )}
            </select>
        </div>
    );
};

export default CustomerSelect;