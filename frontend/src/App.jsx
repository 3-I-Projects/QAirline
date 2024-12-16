import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import SignIn from "./pages/Normal/SignIn";
import SignUp from "./pages/Normal/SignUp";
import Home from "./Home";
import Login from "./pages/Admin/Login";
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import UserForm from "./components/UserForm";
import CustomerDetailPage from "./pages/Normal/CustomerDetailPage";
import AvailableFlights from "./AvailableFlights";
import BookingContextProvider from "./context/BookingContext";
import SeatPickerPage from "./pages/Normal/SeatPickerPage";
import PaymentPage from "./pages/Normal/PaymentPage";

import Dashboard from "./pages/Admin/Dashboard";
import AirportAdd from "./pages/Admin/Airports/AirportAdd";
import AirportList from "./pages/Admin/Airports/AirportList";
import AirportDetail from "./pages/Admin/Airports/AirportDetail";


function AdminLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <BookingContextProvider>
            <Routes>
              {/* Các route công khai */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/flights" element={<AvailableFlights />} />
              <Route path="/home" element={<Home />} />
              <Route path="/detail" element={<CustomerDetailPage />} />
              <Route path="/seats" element={<SeatPickerPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              {/* <Route path='/admin' element={<Login />} exact />
            <Route element={<PrivateRoute />} path='/admin/dashboard'>
              <Route index element={<Dashboard />} exact />
            </Route> */}

              <Route path="/admin" element={<AdminLayout />} exact>
                <Route index element={<Login />} exact />

                <Route path="dashboard" element={<PrivateRoute />} exact>
                  <Route index element={<Dashboard />} exact />
                </Route>

                <Route path="airports" element={<PrivateRoute />} exact>
                  <Route index element={<AirportList />} exact />
                  <Route path="add" element={<AirportAdd />} />
                  <Route path="detail" element={<AirportDetail />} />
                </Route>
                
              </Route>
            </Routes>
          </BookingContextProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
