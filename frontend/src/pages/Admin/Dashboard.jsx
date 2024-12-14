import React from 'react'
import { useAuth } from '../../context/AuthContext';


const Dashboard = () => {
  const auth = useAuth();
  return (
      <div>
        <p>Welcome again, motherfucker! You're in admin dashboard.</p>
        <button onClick={() => auth.logoutAction()}>Logout</button>
      </div>
  )
}

export default Dashboard;