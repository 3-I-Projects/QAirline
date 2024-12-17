import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const FlightDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { flight } = location.state;
	const [input, setInput] = useState({
		"plane": flight.plane,
		"origin_airport": flight.origin_airport,
		"destination_airport": flight.destination_airport,
		"departure_time": flight.departure_time,
		"delay": flight.delay,
		"base_price": flight.base_price,
		"arrival_time": flight.arrival_time
	});
	const [planes, setPlanes] = useState([]);
	const [airports, setAirports] = useState([]);

	useEffect(() => {
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

		fetchPlanes();
	}, []);

	useEffect(() => {
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

		fetchAirports();
	}, []);

	const handleSubmitEvent = async (e) => {
		e.preventDefault();

		if (input.code !== '' && input.city !== '' && input.name !== '') {
			try {
				const response = await fetch('http://localhost:8000/flights/flights/' + flight.id, {
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
				<label htmlFor="plane">Current Airport</label>
				<select className='form-select' name="plane" id="" defaultValue={input.plane} onChange={handleInput}>
					{planes.map((plane) => (
						<option key={plane.id} value={plane.id}>{plane.registration_number}</option>
					))}
				</select>
			</div>

			<div className='form-group'>
				<label htmlFor="origin_airport">Origin Airport</label>
				<select className='form-select' name="origin_airport" id="" defaultValue={input.origin_airport} onChange={handleInput}>
					{airports.map((airport) => (
						<option key={airport.code} value={airport.id}>{airport.code} - {airport.name}</option>
					))}
				</select>
			</div>

			<div className='form-group'>
				<label htmlFor="destination_airport">Destination Airport</label>
				<select className='form-select' name="destination_airport" id="" defaultValue={input.destination_airport} onChange={handleInput}>
					{airports.map((airport) => (
						<option key={airport.code} value={airport.id}>{airport.code} - {airport.name}</option>
					))}
				</select>

			</div>

			<div className='form-group'>
				<label htmlFor="departure_time">Departure Time</label>
				<input
					type='datetime-local'
					name='departure_time'
					value={input.departure_time}
					onChange={handleInput}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="arrival_time">Arrival Time</label>
				<input
					type='datetime-local'
					name='arrival_time'
					value={input.arrival_time}
					onChange={handleInput}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="delay">Delay</label>
				<input
					type='number'
					name='delay'
					value={input.delay}
					onChange={handleInput}
				/>

			</div>

			<div className='form-group'>
				<label htmlFor="base_price">Base Price</label>
				<input
					type='number'
					name='base_price'
					value={input.base_price}
					onChange={handleInput}
				/>
			</div>

			<button type='submit'>Update Flight</button>
		</form>
	)
}

export default FlightDetail