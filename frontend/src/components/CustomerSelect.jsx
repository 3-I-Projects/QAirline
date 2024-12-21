import React, { useEffect, useState } from 'react';

const CustomerSelect = ({ accessToken, value, onChange }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu lỗi nếu có

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const headers = { "Content-Type": "application/json" };
                if (accessToken) {
                    headers["Authorization"] = `Bearer ${accessToken}`;
                }

                const response = await fetch('http://localhost:8000/users/info', {
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCustomers(data.customers || []); // Đảm bảo `customers` luôn là mảng
            } catch (err) {
                setError(err.message); // Lưu lỗi
                console.error('Error fetching customers:', err);
            } finally {
                setLoading(false); // Kết thúc tải
            }
        };

        fetchCustomers();
    }, [accessToken]);

    return (
        <div className='customer-select'>
            <label htmlFor="customer-select">Chọn: ‎</label>
            <select
                name="id"
                id="customer-select"
                value={value?.id || ''}
                onChange={onChange}
            >
                <option value="">-- Chọn hành khách cũ --</option>
                {loading ? (
                    <option value="">Đang tải hành khách...</option>
                ) : error ? (
                    <option value="">Lỗi tải dữ liệu: {error}</option>
                ) : customers.length > 0 ? (
                    customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))
                ) : (
                    <option value="">Không có hành khách nào</option>
                )}
            </select>
        </div>
    );
};

export default CustomerSelect;
