import { createContext, useState, useContext, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
	const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
	const [ userInfo, setUserInfo ] = useState({
        email: '',
        id: 0,
        username: '',
        booked_tickets: [],
        customers: []
    });

	const navigate = useNavigate();

	const loginAction = async (data, mode) => {
		try {
			const response = await fetch('http://localhost:8000/api/token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const res = await response.json();

			if (res && mode === 'admin') {
				if (jwtDecode(res.access).is_admin === true) {
					setAccessToken(res.access);
					localStorage.setItem('accessToken', res.access);
					localStorage.setItem('username', jwtDecode(res.access).username);
					localStorage.setItem('isLoggedIn', true);
					navigate('/admin/dashboard');
					return;
				} else {
					alert('You are not authorized to access this page');
				}
			} else if (res && mode === 'user') {
				setAccessToken(res.access);
				localStorage.setItem('accessToken', res.access);
				localStorage.setItem('username', jwtDecode(res.access).username);
				localStorage.setItem('isLoggedIn', true);
				navigate('/home');
				return;
			} else {
				alert('Invalid username or password');
			}
		} catch (err) {
			console.log(err);
		}
	}

	const logoutAction = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('username');
		localStorage.removeItem('isLoggedIn');
	}

	return (
		<AuthContext.Provider value={{ accessToken, loginAction, logoutAction, userInfo, setUserInfo }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext);
}