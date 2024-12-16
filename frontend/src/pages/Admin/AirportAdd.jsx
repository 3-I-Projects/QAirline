import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AirportAdd = () => {
  const [input, setInput] = useState({
    code: '',
    city: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (input.code !== '' && input.city !== '' && input.name !== '') {
      try {
        const response = await fetch('http://localhost:8000/flights/airports', {
          method: 'POST',
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
          alert('Airport added');
          navigate('/admin/dashboard');
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
        <label htmlFor="code">Airport Code</label>
        <input
          type="text"
          name='code'
          onChange={handleInput}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name='city'
          onChange={handleInput}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name='name'
          onChange={handleInput}
          required
        />
      </div>

      <button type='submit'>Add Airport</button>
    </form>
  )
}

export default AirportAdd