import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AirportDetail = () => {
  const location = useLocation();
  const { airport } = location.state;
  const [input, setInput] = useState({
    code: airport.code,
    city: airport.city,
    name: airport.name,
  });
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (input.code !== '' && input.city !== '' && input.name !== '') {
      try {
        const response = await fetch('http://localhost:8000/flights/airports/' + airport.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });

        if (!response.ok) {
          alert('Invalid input!');
          return;
        }

        const res = await response.json();

        if (res) {
          alert('Airport updated!');
          navigate('/admin/airports');
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

  return(
    <form onSubmit={handleSubmitEvent}>
      <div>{airport.id}</div>
      <div className='form-group'>
        <label htmlFor="code">Airport Code</label>
        <input
          type="text"
          name='code'
          onChange={handleInput}
          placeholder={airport.code}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name='city'
          onChange={handleInput}
          placeholder={airport.city}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name='name'
          onChange={handleInput}
          placeholder={airport.name}
        />
      </div>

      <button type='submit'>Update Airport</button>
    </form>
  )
}

export default AirportDetail