import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const logout = () => {
	const auth = useAuth();
	auth.logoutAction();

	const navigate = useNavigate();
	navigate('/admin');
};

const Dashboard = () => {
	const auth = useAuth();
	return (
		<div>
			<p>Welcome again, motherfucker! You're in admin dashboard.</p>
			<button>Add a flight</button>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Dashboard;