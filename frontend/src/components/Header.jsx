import { React } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  let username = (localStorage.getItem('username')) ? localStorage.getItem('username'): 'guest';

  return (
    <div>
      <Link to='/'>Normal Homepage</Link>
      <span> | </span>
      <Link to='http://localhost:8000/admin'>Backend Admin</Link>
      <span> | </span>
      <Link to='/admin'>Admin Homepage</Link>
      <span> | </span>
      <Link to='/admin/list-airport'>Airports List</Link>

      <p>Hello, nigga {username}</p>
    </div>
  )
}

export default Header;