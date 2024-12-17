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

import PlaneAdd from "./pages/Admin/Planes/PlaneAdd";
import PlaneList from "./pages/Admin/Planes/PlaneList";
import PlaneDetail from "./pages/Admin/Planes/PlaneDetail";
import UserProfile from "./pages/Normal/UserProfile";
import MyBookingsPage from "./pages/Normal/MyBookingsPage";

import FlightAdd from "./pages/Admin/Flights/FlightAdd";
import FlightList from "./pages/Admin/Flights/FlightList";
import FlightDetail from "./pages/Admin/Flights/FlightDetail";

import PostList from "./pages/Admin/Posts/PostList";
import AnnouncementDetail from "./pages/Admin/Posts/AnnouncementDetail";

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
              <Route path="/user" element={<UserProfile />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />

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

                <Route path="planes" element={<PrivateRoute />} exact>
                  <Route index element={<PlaneList />} exact />
                  <Route path="add" element={<PlaneAdd />} />
                  <Route path="detail" element={<PlaneDetail />} />
                </Route>

                <Route path="flights" element={<PrivateRoute />} exact>
                  <Route index element={<FlightList />} exact />
                  <Route path="add" element={<FlightAdd />} />
                  <Route path="detail" element={<FlightDetail />} />
                </Route>

                <Route path="posts" element={<PrivateRoute />} exact>
                  <Route index element={<PostList />} />
                  <Route path="detail" element={<AnnouncementDetail />} />
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
