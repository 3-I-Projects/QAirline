import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const FlightList = () => {
	const [flights, setFlights] = useState([]);
	const navigate = useNavigate();
	const [airports, setAirports] = useState([]);
	const [planes, setPlanes] = useState([]);

	const fetchFlights = async () => {
		try {
			const response = await fetch('http://localhost:8000/flights/flights', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});

			const res = await response.json();
			setFlights(res);
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
		}
		catch (err) {
			console.log(err);
		}
	};

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

	useEffect(() => {
		fetchPlanes();
		fetchAirports();
		fetchFlights();
	}, []);

	const planeIdToName = (planeId) => {
		const plane = planes.find((plane) => plane.id === planeId);
		return plane;
	};

	const handleDeleteAction = async (id) => {
		try {
			const response = await fetch('http://localhost:8000/flights/flights/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			let newFlightsList = flights.filter((flight) => flight.id !== id);
			setPlanes(newFlightsList);
		} catch (err) {
			console.log(err);
		}
	};

	const goToAddFlight = () => {
		navigate('/admin/flights/add');
	};

	const isoDateToLocale = (isoDate) => {
		const date = new Date(isoDate);
		return date.toLocaleString();
	}

	return (
		<div>
			<h2>Flights List</h2>
			<button onClick={goToAddFlight}>Add a flight</button>
			<table>
				<thead>
					<tr>
						<th>Flight number</th>
						<th>Plane</th>
						<th>Origin Airport</th>
						<th>Destination Airport</th>
						<th>Available Seats</th>
						<th>Departure Time</th>
						<th>Arrival Time</th>
						<th>Delay (Hours)</th>
						<th>Base Price (US Dollar)</th>
						<th>Delete Flight</th>
					</tr>
				</thead>
				<tbody>
					{flights.map((flight) => (
						<tr key={flight.id}>
							<td>
								<Link to={'/admin/flights/detail'} state={{ flight: flight }}>VNA-{flight.id}</Link>
							</td>
							<td>{planeIdToName(flight.plane).registration_number}</td>
							<td>{airports.find((airport) => airport.id === flight.origin_airport).name}</td>
							<td>{airports.find((airport) => airport.id === flight.destination_airport).name}</td>
							<td>{flight.available_seat_count}</td>
							<td>{isoDateToLocale(flight.departure_time)}</td>
							<td>{isoDateToLocale(flight.arrival_time)}</td>
							<td>{flight.delay}</td>
							<td>{flight.base_price}</td>
							<td>
								<button onClick={() => handleDeleteAction(flight.id)}>Delete flight</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default FlightList;