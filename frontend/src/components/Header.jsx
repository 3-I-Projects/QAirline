import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  let username = (localStorage.getItem('username')) ? localStorage.getItem('username'): 'guest';
  const auth = useAuth();
	const navigate = useNavigate();

	const logout = () => {
		auth.logoutAction();
		navigate('/admin');
	};

  return (
    <div>
      <Link to='/'>Normal Homepage</Link>
      <span> | </span>
      <Link to='http://localhost:8000/admin'>Backend Admin</Link>
      <span> | </span>
      <Link to='/admin'>Admin Homepage</Link>
      <span> | </span>
      <button onClick={logout}>Logout</button>

      <p>Hello, nigga {username}</p>
    </div>
  )
}

export default Header;