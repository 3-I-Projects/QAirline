import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'

import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import Home from './Home';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard'
import Header from './components/Header';

import PrivateRoute from './utils/PrivateRoute';


function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />

            <Route path='/admin' Component={Login} exact />
            <Route element={<PrivateRoute />} path='/admin/dashboard'>
              <Route index element={<Dashboard />} exact />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
