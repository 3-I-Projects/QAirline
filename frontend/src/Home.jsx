import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Home.css';
import Menu from './Menu';
import FeatureCard from './FeatureCard';
import Background from './Background';
// import UserForm from './components/UserForm.jsx';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(true); // State điều khiển hiển thị menu
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      {/* Background */}
      <Background />

      {/* Menu hiển thị ở đầu trang và ẩn khi cuộn xuống */}
      {showMenu && <Menu />}

      {/* Nội dung chính phía sau menu */}
      <div className="content">
        <FeatureCard />
        {/* <UserForm /> */}
      </div>
    </div>
  );
}

export default Home;
