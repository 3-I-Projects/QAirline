import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });

        const res = await response.json();
        setUsers(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteAction = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/users/users/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      let newUsersList = users.filter((user) => user.id !== id);
      setUsers(newUsersList);
    } catch (err) {
      console.log(err);
    }
  }

  const goToUserAdd = () => {
    navigate('/admin/users/add');
  }

  return (
    <div>
      <button onClick={goToUserAdd}>Add an user</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Number of booked tickets</th>
            <th>Admin Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={'/admin/users/detail'} state={{ user: user }}>{user.username}</Link></td>
              <td>{user.email}</td>
              <td>{user.booked_tickets.length}</td>
              <td>{user.is_staff ? 'Admin' : 'User'}</td>
              <td>
                <button onClick={() => handleDeleteAction(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList;