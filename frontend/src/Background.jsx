import React, { useEffect, useState } from 'react';
import './style/Background.css'; 


const Background = () => {
    const [currentBackgroundClass, setCurrentBackgroundClass] = useState('bg1');
    const [isAutoChangeEnabled, setIsAutoChangeEnabled] = useState(true);
    const [selectedBackground, setSelectedBackground] = useState(null);

    const backgrounds = ['bg1', 'bg2', 'bg3', 'bg4'];

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
    <div className={`bg-container ${currentBackgroundClass}`}>
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
export default Background;