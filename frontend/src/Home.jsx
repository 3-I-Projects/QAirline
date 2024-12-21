import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Home.css';
import Menu from './Menu';
import FeatureCard from './FeatureCard';
import Background from './Background';
<<<<<<< HEAD
import AnnouncementSection from './components/AnnouncementSection';
import Footer from './components/Footer';
=======
import AnnouncementsSection from './components/AnnouncementsSection';
import DiscountsSection from './components/DiscountsSection';
import NewsSection from './components/NewsSection';
import InformationsSection from './components/InformationsSection';

// import UserForm from './components/UserForm.jsx';
>>>>>>> refs/remotes/origin/main

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
      <div>
        <AnnouncementSection/>
      </div>
      <Footer />
=======
        <AnnouncementsSection />
        <DiscountsSection />
        <NewsSection />
        <InformationsSection />
>>>>>>> refs/remotes/origin/main
    </div>
  );
}

export default Home;
