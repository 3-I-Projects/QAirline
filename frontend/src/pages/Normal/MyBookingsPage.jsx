import React, { useContext, useEffect } from 'react';
import Ticket from '../../components/Ticket';
import AuthContext from '../../context/AuthContext';

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
        <div>
            <h1>My Bookings</h1>
            <p>Welcome to the My Bookings page. Here you can view all your bookings.</p>
            {userInfo && userInfo.booked_tickets && userInfo.booked_tickets.length > 0 ? (
                userInfo.booked_tickets.map(ticket => (
                    <Ticket key={ticket} id={ticket} />
                ))
            ) : (
                <div>You've made no bookings</div>
            )}
            {/* <Ticket /> */}
        </div>
    );
};

export default MyBookingsPage;