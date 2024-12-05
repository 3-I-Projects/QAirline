import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Home.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component được render
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Hàm để điều hướng đến trang Login
  const goToLogin = () => {
    navigate('/login');
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/home');
  };

  return (
    <><div className="menu">
      {!isLoggedIn ? (
        <><button onClick={goToLogin} className="home-button">
          Sign In
        </button></>
      ) : (
        <button onClick={handleLogout} className="home-button logout-button">
          Logout
        </button>
      )}
    </div><div className="home-container">
        <h1>Welcome to the Home Page!</h1>
        <p>{isLoggedIn ? 'You are logged in!' : 'Please login to continue.'}</p>
      </div></>
  );
}

export default Home;
