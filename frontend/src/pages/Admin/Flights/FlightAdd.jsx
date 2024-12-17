import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FlightAdd = () => {
    const [input, setInput] = useState({
        "plane": null,
        "origin_airport": null,
        "destination_airport": null,
        "departure_time": null,
        "delay": null,
        "base_price": null,
        "arrival_time": null
    });
    const [flights, setFlights] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [airports, setAirports] = useState([]);
    const navigate = useNavigate();

    const fetchPlanes = async () => {
        try {
            const response = await fetch('http://localhost:8000/flights/planes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });

            const res = await response.json();
            setPlanes(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAirports = async () => {
        try {
            const response = await fetch('http://localhost:8000/flights/airports', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });

            const res = await response.json();
            setAirports(res);
        } catch (err) {
            console.log(err);
        }
    }
    // useEffect to fetch airports from backend once when component mounts
    useEffect(() => {
        fetchPlanes();
        fetchAirports();
    }, []);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (input.code !== '' && input.city !== '' && input.name !== '') {
            try {
                const response = await fetch('http://localhost:8000/flights/flights', {
                    method: 'POST',
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
                    alert('Flight added');
                    navigate('/admin/flights');
                    return;
                } else {
                    alert('Invalid input');
                }
            } catch (err) {
                console.log(err);
            }
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
            <div className='form-group'>
                <label htmlFor="plane">Plane</label>
                <select className='form-select' name="plane" id="" defaultValue={'DEFAULT'} onChange={handleInput}>
                    <option value="DEFAULT" disabled>Select a plane</option>
                    {planes.map((plane) => (
                        <option key={plane.id}>{plane.registration_number}</option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="origin_airport">Origin airport</label>
                <select className='form-select' name="origin_airport" id="" defaultValue={'DEFAULT'} onChange={handleInput}>
                    <option value="DEFAULT" disabled>Select origin airport</option>
                    {airports.map((airport) => (
                        <option key={airport.id}>{airport.name}</option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="destination_airport">Destination airport</label>
                <select className='form-select' name="destination_airport" id="" defaultValue={'DEFAULT'} onChange={handleInput}>
                    <option value="DEFAULT" disabled>Select destination airport</option>
                    {airports.map((airport) => (
                        <option key={airport.id}>{airport.name}</option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="departure_time">Departure time</label>
                <input
                    type="datetime-local"
                    name='departure_time'
                    onChange={handleInput}
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="arrival_time">Arrival time</label>
                <input
                    type="datetime-local"
                    name='arrival_time'
                    onChange={handleInput}
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="delay">Delay</label>
                <input
                    type="number"
                    name='delay'
                    onChange={handleInput}
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="base_price">Base price</label>
                <input
                    type="number"
                    name='base_price'
                    onChange={handleInput}
                    required
                />
            </div>
        </form>
    )
}

export default FlightAdd