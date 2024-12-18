import { React } from 'react'
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
		<div>
			<p>Welcome again, motherfucker! You're in admin dashboard.</p>
			<button onClick={goToAirports}>Airports Management</button>
			<span> | </span>
			<button onClick={goToPlanes}>Planes Management</button>
			<span> | </span>
			<button onClick={goToFlights}>Flights Management</button>
			<span> | </span>
			<button onClick={goToPosts}>Posts Management</button>
			<span> | </span>
			<button onClick={goToUsers}>Users Management</button>
		</div>
	)
}

export default Dashboard;