import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Login/SignIn'; 
import SignUp from './Login/SignUp'; 
import Home from './Home'; 
import AvailableFlights from './AvailableFlights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flights" element={<AvailableFlights />} />
      </Routes>
    </Router>
  );
}

export default App;
