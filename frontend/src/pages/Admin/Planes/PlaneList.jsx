import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const PlaneList = () => {
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
	};

	useEffect(() => {
		fetchAirports();
		fetchPlanes();
	}, []);

	const handleDeleteAction = async (id) => {
		try {
			const response = await fetch('http://localhost:8000/flights/planes/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			let newPlanesList = planes.filter((plane) => plane.id !== id);
			setPlanes(newPlanesList);
		} catch (err) {
			console.log(err);
		}
	}
	const airportIdToName = (id) => {
		for (let i = 0; i < airports.length; i++) {
			if (airports[i].id === id) {
				return airports[i].name;
			}
		}
	}

	const goToAddPlane = () => {
		navigate('/admin/planes/add');
	};
	return (
		<div>
			<h2>Planes List</h2>
			<button onClick={goToAddPlane}>Add a plane</button>
			<table>
				<thead>
					<tr>
						<th>Registration Number</th>
						<th>Manufacturer</th>
						<th>Model</th>
						<th>Current Airport</th>
						<th>Number of First Class Rows</th>
						<th>Number of Business Class Rows</th>
						<th>Number of Premium CLass Rows</th>
						<th>Number of Economy Class Rows</th>
						<th>Delete PLane</th>
					</tr>
				</thead>
				<tbody>
					{planes.map((plane) => (
						<tr key={plane.registration_number}>
							<td>
								<Link to={'/admin/planes/detail'} state={{ plane: plane }}>{plane.registration_number}</Link>
							</td>
							<td>{plane.manufacturer}</td>
							<td>{plane.model}</td>
							<td>{airportIdToName(plane.current_airport)}</td>
							<td>{plane.first_class_row_count}</td>
							<td>{plane.business_class_row_count}</td>
							<td>{plane.premium_class_row_count}</td>
							<td>{plane.economy_class_row_count}</td>
							<td>
								<button onClick={() => handleDeleteAction(plane.id)}>Delete plane</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default PlaneList