import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import Home from './Home';
import Login from './Pages/Admin/Login';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />

        <Route path='/admin' Component={Login} exact/>
        <Route element={<PrivateRoute />} path='/admin/private'>
          <Route element={<Login />} path='/admin/private'/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
