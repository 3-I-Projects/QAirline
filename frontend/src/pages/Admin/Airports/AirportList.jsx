import React, { useState, useEffect } from 'react'

const AirportList = () => {
	const [airports, setAirports] = useState([]);
	const [sortField, setSortField] = useState({
		name: '',
		asc: true,
	});

	// useEffect to fetch airports from backend once when component mounts
	useEffect(() => {
		const fetchAirports = async () => {
			try {
				const response = await fetch('http://localhost:8000/flights/airports', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const res = await response.json();
				setAirports(res);
			} catch (err) {
				console.log(err);
			}
		};

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

	const goToUpdateAirport = (id) => {
		navigate('/admin/airports/update/' + id);
	}

	return (
		<div>
			<h2>Airports List (Sorted by: {sortField.name ? sortField.name + ' ascending: ' + sortField.asc : 'unsorted'})</h2>
			<table>
				<thead>
					<tr>
						<th>Name<button onClick={() => changeSortState('name', sortField.asc)}>Sort by name</button></th>
						<th>Code<button onClick={() => changeSortState('code', sortField.asc)}>Sort by code</button></th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{airports.map((airport) => (
						<tr key={airport.code}>
							<td>{airport.name}</td>
							<td>{airport.code}</td>
							<td>
								<button onClick={() => handleDeleteAction(airport.id)}>Delete airport</button>
								<span> | </span>
								<button>Update airport</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AirportList