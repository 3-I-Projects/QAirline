import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/AdminGlobal.css';

const Header = () => {
  let username = (localStorage.getItem('username')) ? localStorage.getItem('username'): 'guest';
  const auth = useAuth();
	const navigate = useNavigate();

	const logout = () => {
		auth.logoutAction();
		navigate('/admin');
	};

  return (
    <div className='header-container'>
      <p style={{color: 'black'}}>Welcome, {username}</p>
      <Link className='header-link' to='/'>Normal Homepage</Link>
      <Link className='header-link' to='http://localhost:8000/admin'>Backend Admin</Link>
      <Link className='header-link' to='/admin'>Admin Homepage</Link>
      {localStorage.getItem('isLoggedIn') ? <button onClick={logout}>Logout</button> : null}
    </div>
  )
}

export default Header;