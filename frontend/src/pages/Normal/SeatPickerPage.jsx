import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { BookingContext } from '../../context/BookingContext';
import AuthContext from '../../context/AuthContext';
import '../../style/SeatPicker.css';
import Menu from '../../Menu';
import Footer from '../../components/Footer';

const SeatPickerPage = () => {
    const navigate = useNavigate();
    const { flight, allCustomers, customerCount, ticketIds, setTicketIds, roundTripFlight, bookingInfo } = useContext(BookingContext);
    const { accessToken } = useContext(AuthContext);
    const [seats, setSeats] = useState([]); // Dữ liệu ghế
    const [selectedSeats, setSelectedSeats] = useState([]); // Các ghế đã chọn

    // Định nghĩa màu sắc cho các hạng ghế
    const seatClassColors = {
        '0': '#e2574d', // Hạng nhất: đỏ
        '1': '#e7a94a', // Hạng thương gia: cam
        '2': '#8857dc', // Hạng cao cấp: tím
        '3': '#60e789', // Hạng phổ thông: xanh lá
    };

    // Định nghĩa tên các hạng ghế
    const seatClassLabels = {
        '0': 'Hạng Nhất: ',
        '1': 'Hạng Thương Gia: ',
        '2': 'Hạng Cao Cấp: ',
        '3': 'Hạng Phổ Thông: ',
    };

    useEffect(() => {
        fetch(`http://localhost:8000/flights/flights/${flight.id}/seats`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Lỗi khi tải ghế: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setSeats(data);
            })
            .catch(error => {
                console.error("Lỗi khi tải ghế:", error);
                toast.error("Lỗi khi tải dữ liệu.");
            });
    }, [flight]);

    const toggleSeatSelection = (seat) => {
        if (selectedSeats.find((s) => s.id === seat.id)) {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
        } else {
            if (selectedSeats.length < customerCount) {
                setSelectedSeats([...selectedSeats, seat]);
            } else {
                toast.error("Không thể chọn số ghế nhiều hơn số hành khách!");
            }
        }
    };

    const onClick = async () => {
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }
        for (let i = 0; i < customerCount; i++) {
            const data = {
                "customer": allCustomers[i].id,
                "flight": flight.id,
                "seat": selectedSeats.length > 0 ? selectedSeats[i].id : ''
            };
            try {
                const response = await fetch('http://localhost:8000/tickets/', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`Lỗi khi đặt vé: ${response.statusText}`);
                }
                const result = await response.json();
                setTicketIds((prevTicketIds) => [...prevTicketIds, result.id]);
                toast.success("Đặt vé thành công!");
            } catch (error) {
                toast.error("Lỗi: " + error.message);
                console.error(error);
            }
        }
        if (bookingInfo.tripType === 'khứ hồi') {
            navigate('/round-trip-seats');
        } else {
            navigate('/payment');
        }
    };

    // Định nghĩa các nhãn cột
    const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className='seat-picker'>
            <Menu />
            <div className="seat-picker-page-container">
                <h1>Chọn ghế chuyến đi</h1>
                <div className="seat-info">
                    <p> Ghế khả dụng <span className="seat-icon available-seat"></span></p>
                    <p> Ghế đã chọn <span className="seat-icon selected-seat"></span></p>
                    <p> Ghế không khả dụng <span className="seat-icon unavailable-seat"></span></p>
                </div>

                <div className="seat-grid">
                    {/* Hàng đầu tiên - Nhãn cột */}
                    <div className="seat-row">
                        {columnLabels.map((label, index) => (
                            <div key={index} className="seat-label">{label}</div>
                        ))}
                    </div>

                    {/* Hiển thị ghế theo hàng */}
                    {Array.from({ length: Math.ceil(seats.length / 6) }).map((_, rowIndex) => (
                        <div className="seat-row" key={rowIndex}>
                            {seats.slice(rowIndex * 6, rowIndex * 6 + 6).map((seat) => (
                                <div
                                    key={seat.id}
                                    onClick={() => seat.is_available && toggleSeatSelection(seat)}
                                    className={`seat ${seat.is_available ? 'available' : 'unavailable'} ${selectedSeats.find((s) => s.id === seat.id) ? 'selected' : ''}`}
                                    style={{ backgroundColor: seat.is_available ? seatClassColors[seat.seat_class] : 'gray' }}
                                    title={`Hàng: ${seat.row}, Cột: ${seat.column}, Giá: ${seat.price}, Hạng: ${seatClassLabels[seat.seat_class]}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="50" height="50">
                                        <rect className="seat-body" x="18" y="10" width="28" height="20" rx="4" ry="4" />
                                        {!seat.is_available && (
                                            <text x="32" y="24" fontSize="14" fill="#000" textAnchor="middle" alignmentBaseline="middle" fontWeight="bold">
                                                X
                                            </text>
                                        )}
                                        <rect className="seat-armrest" x="16" y="28" width="4" height="10" rx="2" ry="2" />
                                        <rect className="seat-armrest" x="44" y="28" width="4" height="10" rx="2" ry="2" />
                                        <rect className="seat-cushion" x="20" y="32" width="24" height="8" rx="3" ry="3" />
                                    </svg>
                                    <div className="seat-class-label">
                                        {seatClassLabels[seat.seat_class]}{seat.price}USD
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={onClick} className="submit">Tiếp tục</button>
                <Toaster />
            </div>
            <Footer />
        </div>
    );
};

export default SeatPickerPage;
