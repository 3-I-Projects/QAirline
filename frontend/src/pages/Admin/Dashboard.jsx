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

	return (
		<div>
			<p>Welcome again, motherfucker! You're in admin dashboard.</p>
			<button onClick={goToAirports}>Airports Management</button>
			<button onClick={goToPlanes}>Planes Management</button>
		</div>
	)
}

export default Dashboard;