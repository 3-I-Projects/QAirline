import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const AirportList = () => {
	const [airports, setAirports] = useState([]);
	const [sortField, setSortField] = useState({
		name: '',
		asc: true,
	});
	const navigate = useNavigate();

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

	// useEffect to fetch airports from backend once when component mounts
	useEffect(() => {
		fetchAirports();
	}, []);

	// useEffect to rerender airports list when sortField changes
	useEffect(() => {
		// sort the airports, [...airports] just makes a copy of the array
		const sortedAirports = [...airports].sort((a, b) => {
			if (sortField.asc) {
				if (a[sortField.name] < b[sortField.name]) {
					return -1;
				} else if (a[sortField.name] > b[sortField.name]) {
					return 1;
				} else {
					return 0;
				}
			} else {
				if (a[sortField.name] > b[sortField.name]) {
					return -1;
				} else if (a[sortField.name] < b[sortField.name]) {
					return 1;
				} else {
					return 0;
				}
			}
		});
		setAirports(sortedAirports);
	}, [sortField]);

	const handleDeleteAction = async (id) => {
		try {
			const response = await fetch('http://localhost:8000/flights/airports/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			let newAirportList = airports.filter((airport) => airport.id !== id);
			setAirports(newAirportList);
		} catch (err) {
			console.log(err);
		}
	}

	const changeSortState = (field, asc) => {
		if (sortField.name === field) {
			console.log('same field');
			setSortField({ name: field, asc: !sortField.asc });
		} else {
			console.log('different field');
			setSortField({ name: field, asc: true });
		}
	};

	const goToAddAirport = () => {
		navigate('/admin/airports/add');
	}

	return (
		<div className='airports-container'>
			<h2>Airports List (Sorted by: {sortField.name ? sortField.name + ' ascending: ' + sortField.asc : 'unsorted'})</h2>
			<button onClick={goToAddAirport}>Add an airport</button>
			<table className='airports-table'>
				<thead>
					<tr>
						<th>Airport Name<button onClick={() => changeSortState('name', sortField.asc)}>Sort by name</button></th>
						<th>Airport Code<button onClick={() => changeSortState('code', sortField.asc)}>Sort by code</button></th>
						<th>Location<button onClick={() => changeSortState('city', sortField.asc)}>Sort by city</button></th>
						<th>Delete Airport</th>
					</tr>
				</thead>
				<tbody>
					{airports.map((airport) => (
						<tr key={airport.code}>
							<td>
								<Link to={'/admin/airports/detail'} state={{airport: airport}}>{airport.name}</Link>
							</td>
							<td>{airport.code}</td>
							<td>{airport.city}</td>
							<td>
								<button onClick={() => handleDeleteAction(airport.id)}>Delete Airport</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AirportList