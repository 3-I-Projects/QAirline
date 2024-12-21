import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Home.css';
import Menu from './Menu';
import FeatureCard from './FeatureCard';
import Background from './Background';
<<<<<<< HEAD
=======
import Footer from './components/Footer';
>>>>>>> 7902eba89cf0efbf01fb3d1429ebf1d78671e993
import AnnouncementsSection from './components/AnnouncementsSection';
import DiscountsSection from './components/DiscountsSection';
import NewsSection from './components/NewsSection';
import InformationsSection from './components/InformationsSection';

// import UserForm from './components/UserForm.jsx';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="home-container">
      <Background />

      {/* Menu hiển thị ở đầu trang và ẩn khi cuộn xuống */}
      <div className='menu'>
        <Menu />  
      </div>
      

      {/* Nội dung chính phía sau menu */}
      <div className="content">
        <FeatureCard />
      </div>
<<<<<<< HEAD

=======
      <Footer />
>>>>>>> 7902eba89cf0efbf01fb3d1429ebf1d78671e993
        <AnnouncementsSection />
        <DiscountsSection />
        <NewsSection />
        <InformationsSection />
    </div>
  );
}

export default Home;
