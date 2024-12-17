import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const AnnouncementDetail = () => {
    const location =  useLocation();
    const { announcement } = location.state;
    const [input, setInput] = useState({
        "title": announcement.title,
        "body": announcement.body,
        "status": announcement.status,
        "start_date": announcement.start_date,
        "end_date": announcement.end_date,
        "alert_level": announcement.alert_level,
    });

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/posts/announcements' + flight.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(input)
            });

            if (!response.ok) {
                alert('Invalid input!');
                return;
            }

            const res = await response.json();

            if (res) {
                alert('Flight updated!');
                navigate('/admin/flights');
                return;
            } else {
                alert('Invalid input');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <form onSubmit={handleSubmitEvent}>

        </form>
    )
}

export default AnnouncementDetail