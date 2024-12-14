import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const auth = useAuth();
  let username = 'guest';
  if (auth.accessToken) {
    username = jwtDecode(auth.accessToken).username;
  }
  return (
    <div>
        <Link to='/'>Normal Homepage</Link>
        <span> | </span>
        <Link to='http://localhost:8000/admin'>Backend Admin</Link>

        <p>Hello, nigga {username}</p>
    </div>
  )
}

export default Header