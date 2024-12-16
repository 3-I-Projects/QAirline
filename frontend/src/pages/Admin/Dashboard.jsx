import { React } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const logout = () => {
		auth.logoutAction();
		navigate('/admin');
	};

	const goToAddAirport = () => {
		navigate('/admin/add-airport');
	}

	return (
		<div>
			<p>Welcome again, motherfucker! You're in admin dashboard.</p>
			<button onClick={goToAddAirport}>Add an airport</button>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Dashboard;