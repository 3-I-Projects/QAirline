import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PlaneDetail = () => {
  const location = useLocation();
  const { plane } = location.state;
  const [input, setInput] = useState({
    registration_number: plane.registration_number,
    manufacturer: plane.manufacturer,
    model: plane.model,
    first_class_row_count: plane.first_class_row_count,
    business_class_row_count: plane.business_class_row_count,
    premium_class_row_count: plane.premium_class_row_count,
    economy_class_row_count: plane.economy_class_row_count,
    current_airport: plane.current_airport,
  });
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);

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
        const response = await fetch('http://localhost:8000/flights/planes/' + plane.id, {
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
          alert('Plane updated!');
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
          type='text'
          name='registration_number'
          value={input.registration_number}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          type='text'
          name='manufacturer'
          value={input.manufacturer}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="model">Model</label>
        <input
          type='text'
          name='model'
          value={input.model}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="first_class_row_count">First Class Capacity</label>
        <input
          type='number'
          name='first_class_row_count'
          value={input.first_class_row_count}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="business_class_row_count">Business Class Capacity</label>
        <input
          type='number'
          name='business_class_row_count'
          value={input.business_class_row_count}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="premium_class_row_count">Premium Class Capacity</label>
        <input
          type='number'
          name='premium_class_row_count'
          value={input.premium_class_row_count}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="economy_class_row_count">Economy Class Capacity</label>
        <input
          type='number'
          name='economy_class_row_count'
          value={input.economy_class_row_count}
          onChange={handleInput}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="current-airport">Current Airport</label>
        <select className='form-select' name="current_airport" id="" defaultValue={input.current_airport} onChange={handleInput}>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>{airport.name}</option>
          ))}
        </select>
      </div>
      <button type='submit'>Update Plane</button>
    </form>
  )
}

export default PlaneDetail