import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <Link to='/'>Normal Homepage</Link>
        <span> | </span>
        <Link to='http://localhost:8000/admin'>Backend Admin</Link>
    </div>
  )
}

export default Header