import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	const goToAirports = () => {
		navigate('/admin/airports');
	}

	const goToPlanes = () => {
		navigate('/admin/planes');
	}

	const goToFlights = () => {
		navigate('/admin/flights');
	}

	const goToPosts = () => {
		navigate('/admin/posts');
	}

	const goToUsers = () => {
		navigate('/admin/users');
	}

	return (
		<div className='dashboard-container'>
			<p>Welcome! You're in admin dashboard.</p>
			<div className='dashboard-button-container'>
				<button className='dashboard-button' onClick={goToAirports}>Airports Management</button>
				<button className='dashboard-button' onClick={goToPlanes}>Planes Management</button>
				<button className='dashboard-button' onClick={goToFlights}>Flights Management</button>
				<button className='dashboard-button' onClick={goToPosts}>Posts Management</button>
				<button className='dashboard-button' onClick={goToUsers}>Users Management</button>
			</div>
		</div>
	)
}

export default Dashboard;