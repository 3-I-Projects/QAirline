import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Home.css';
import Menu from './Menu';

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

  const goToSignIn = () => {
    navigate('/signin');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/home');
  };

  const [currentBackgroundClass, setCurrentBackgroundClass] = useState('bg1');
  const [isAutoChangeEnabled, setIsAutoChangeEnabled] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const backgrounds = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];

  // Handle automatic background change
  useEffect(() => {
    let interval;
    if (isAutoChangeEnabled) {
      interval = setInterval(() => {
        setCurrentBackgroundClass((prevClass) => {
          const index = (backgrounds.indexOf(prevClass) + 1) % backgrounds.length;
          return backgrounds[index];
        });
      }, 3000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAutoChangeEnabled, backgrounds]);
  

  // Handle checkbox change
  const handleCheckboxChange = (bgClass) => {
    if (currentBackgroundClass !== bgClass) {
      setCurrentBackgroundClass(bgClass); 
    }
  };

  // Toggle auto-change
  const toggleAutoChange = () => {
    setIsAutoChangeEnabled(!isAutoChangeEnabled);
  };

  return (
    <div className={`container ${currentBackgroundClass}`}>
      <div className="menu-container">
        <Menu />
      </div>

      {/* Background Selector */}
      <div className="background-selector">
        <div className="checkbox-container">
          {backgrounds.map((bgClass) => (
            <label key={bgClass} className="checkbox-label">
              <input
                type="radio"
                name="background"
                checked={currentBackgroundClass === bgClass}
                onChange={() => handleCheckboxChange(bgClass)}
              />
              <div
                className={`custom-checkbox ${
                  currentBackgroundClass === bgClass ? 'active' : ''
                }`}
              />
            </label>
          ))}
          <div className="toggle-auto">
            <button onClick={toggleAutoChange} className="play-pause-button">
              {isAutoChangeEnabled ? '❚❚' : '▶'}
            </button>
          </div>
        </div>
      </div>


      
    </div>
  );
}

export default Home;