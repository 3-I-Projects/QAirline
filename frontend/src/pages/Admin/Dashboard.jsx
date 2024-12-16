import { React } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();
	const goToAirports = () => {
		navigate('/admin/airports');
	}

	return (
		<div>
			<p>Welcome again, motherfucker! You're in admin dashboard.</p>
			<button onClick={goToAirports}>Airports Management</button>
		</div>
	)
}

export default Dashboard;