import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchAirports from '../Airports/AirportList'

const PlaneAdd = () => {
	const [input, setInput] = useState({
		"registration_number": "",
		"manufacturer": "",
		"model": "",
		"first_class_row_count": null,
		"business_class_row_count": null,
		"premium_class_row_count": null,
		"economy_class_row_count": null,
		"current_airport": null
	});
	const [airports, setAirports] = useState([]);
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

	const handleSubmitEvent = async (e) => {
		e.preventDefault();

		if (input.code !== '' && input.city !== '' && input.name !== '') {
			try {
				const response = await fetch('http://localhost:8000/flights/planes', {
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
					alert('Plane added');
					navigate('/admin/planes');
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
        <label htmlFor="registration_number">Registration Number</label>
        <input
          type="text"
          name='registration_number'
          onChange={handleInput}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          onChange={handleInput}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor="model">Model</label>
        <input
          type="text"
          name='model'
          onChange={handleInput}
          required
        />
      </div>

			<div className='form-group'>
        <label htmlFor="first-class-capacity">First-class Capacity</label>
        <input
          type="number"
          name='first_class_row_count'
          onChange={handleInput}
          required
        />
      </div>

			<div className='form-group'>
        <label htmlFor="business-class-capacity">Business-class Capacity</label>
        <input
          type="number"
          name='business_class_row_count'
          onChange={handleInput}
          required
        />
      </div>

			<div className='form-group'>
				<label htmlFor="premium-class-capacity">Premium-class Capacity</label>
				<input
					type="number"
					name='premium_class_row_count'
					onChange={handleInput}
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="economy-class-capacity">Economy-class Capacity</label>
				<input
					type="number"
					name='economy_class_row_count'
					onChange={handleInput}
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="current-airport">Current Airport</label>
				<select className='form-select' name="current_airport" id="" defaultValue={'DEFAULT'} onChange={handleInput}>
					<option value="DEFAULT" disabled>Select an airport</option>
					{airports.map((airport) => (
						<option key={airport.id}>{airport.name}</option>
					))}
				</select>
			</div>

      <button type='submit'>Add Plane</button>
    </form>
  )
}

export default PlaneAdd