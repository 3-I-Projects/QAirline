import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const auth = useAuth();
  const username =  (auth.accessToken) ? jwtDecode(auth.accessToken).username : 'guest';
  return (
    <div>
        <Link to='/'>Normal Homepage</Link>
        <span> | </span>
        <Link to='http://localhost:8000/admin'>Backend Admin</Link>

        <p>Hello, {username}</p>
    </div>
  )
}

export default Header