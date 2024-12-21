import React, { useContext, useEffect } from 'react';
import Ticket from '../../components/Ticket';
import Menu from '../../Menu';
import '../../style/MyBookingPage.css';
import AuthContext from '../../context/AuthContext';
import Footer from '../../components/Footer';

const MyBookingsPage = () => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const { accessToken } = useContext(AuthContext);
    useEffect(() => {
        try {
            const headers = {}
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`
            }
            
            fetch('http://localhost:8000/users/info', {
                headers: headers,
            })
            .then(response => response.json())
            .then(data => {setUserInfo(data);})
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }, []);

    return (
<<<<<<< HEAD
        <>
=======
>>>>>>> 7902eba89cf0efbf01fb3d1429ebf1d78671e993
            <div className='my-booking'>
                <div className='menu'>
                    <Menu />
                </div>
                <div className="booking-container">
                    <h1>Các vé của tôi</h1>
                    <p>Quý khách có thể xem thông tin các vé đã đặt.</p>
                    {userInfo && userInfo.booked_tickets && userInfo.booked_tickets.length > 0 ? (
                        userInfo.booked_tickets.map(ticket => (
                            <Ticket key={ticket} id={ticket} />
                        ))
                    ) : (
                        <div className="no-bookings">Bạn chưa đặt vé nào</div>
                    )}
                </div>
<<<<<<< HEAD
=======
        <div className='my-booking'>
            <div className='menu'>
                <Menu />
            </div>
            <div className="containers">
                <h1>Các vé của tôi</h1>
                <p>Quý khách có thể xem thông tin các vé đã đặt.</p>
                {userInfo && userInfo.booked_tickets && userInfo.booked_tickets.length > 0 ? (
                    userInfo.booked_tickets.map(ticket => (
                        <Ticket key={ticket} id={ticket} />
                    ))
                ) : (
                    <div className="no-bookings">Bạn chưa đặt vé nào</div>
                )}
            </div>
>>>>>>> 7902eba89cf0efbf01fb3d1429ebf1d78671e993

            </div>
            {/* <Footer /> */}
            <Footer />
        </div>
    );
};

export default MyBookingsPage;