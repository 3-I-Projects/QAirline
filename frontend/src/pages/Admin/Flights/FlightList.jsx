import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const FlightList = () => {
	const [flights, setFlights] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
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

		fetchFlights();
	}, []);

	const handleDeleteAction = async (id) => {
		try {
			const response = await fetch('http://localhost:8000/flights/flights/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			let newFlightsList = flights.filter((flights) => flights.id !== id);
			setPlanes(newFlightsList);
		} catch (err) {
			console.log(err);
		}
	}

	const goToAddFlight = () => {
		navigate('/admin/flights/add');
	};
	return (
		<div>
			<h2>Planes List</h2>
			<button onClick={goToAddFlight}>Add a flight</button>
			<table>
				<thead>
					<tr>
						<th>Flight number</th>
						<th>Plane</th>
						<th>Origin Airport</th>
						<th>Destination Airport</th>
						<th>Departure Time</th>
						<th>Arrival Time</th>
						<th>Delay</th>
						<th>Base Price</th>
						<th>Delete Flight</th>
					</tr>
				</thead>
				<tbody>
					{flights.map((flight) => (
						<tr key={flight.id}>
							<td>
								<Link to={'/admin/flights/detail'} state={{ flight: flight }}>VNA-{flight.id}</Link>
							</td>
							<td>{flight.plane}</td>
							<td>{flight.origin_airport}</td>
							<td>{flight.destination_airport}</td>
							<td>{flight.departure_time}</td>
							<td>{flight.arrival_time}</td>
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