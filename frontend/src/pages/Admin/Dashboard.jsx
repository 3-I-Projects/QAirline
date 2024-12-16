import { React } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();
	const goToAddAirport = () => {
		navigate('/admin/airports/add');
	}

	return (
		<div>
			<p>Welcome again, motherfucker! You're in admin dashboard.</p>
			<h2>Quick links:</h2>
			<button onClick={goToAddAirport}>Add an airport</button>
		</div>
	)
}

export default Dashboard;