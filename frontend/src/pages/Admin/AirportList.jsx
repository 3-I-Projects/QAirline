import React, { useState, useEffect } from 'react'

const AirportList = () => {
	const [airports, setAirports] = useState([]);
	const [sortField, setSortField] = useState({
		name: '',
		asc: true,
	});

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
	}, [sortField]); // Run this effect whenever sortField or airports changes

	const sortAirports = (field, asc) => {
		console.log(field, asc);
		console.log(sortField);

		if (sortField.name === field) {
			console.log('same field');
			setSortField({ name: field, asc: !sortField.asc }); // Update sortField state
		} else {
			console.log('different field');
			setSortField({ name: field, asc: true }); // Default sort to ascending for new fields
		}

		console.log(field, asc);
		console.log(sortField);
	};

	return (
		<div>
			<h1>Airports List (Sorted by: {sortField.name ? sortField.name + ' ' + sortField.asc : 'unsorted'})</h1>
			<table>
				<thead>
					<tr>
						<th><button onClick={() => sortAirports('name', sortField.asc)}>Name</button></th>
						<th><button onClick={() => sortAirports('code', sortField.asc)}>Code</button></th>
					</tr>
				</thead>
				<tbody>
					{airports.map((airport) => (
						<tr key={airport.code}>
							<td>{airport.name}</td>
							<td>{airport.code}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AirportList