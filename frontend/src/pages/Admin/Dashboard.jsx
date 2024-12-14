import React from 'react'
import { useAuth } from '../../context/AuthContext';


const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className='container'>
      <div>
        <h1>Welcome again, motherfucker! You're in admin dashboard.</h1>
        <button onClick={() => auth.logoutAction()}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard;