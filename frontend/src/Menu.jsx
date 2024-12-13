import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/MenuStyle.css";

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn');
    const storedUserName = localStorage.getItem('userName');
    if (userStatus === 'true') {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  // Xử lý đăng xuất e
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <header className="menu-header">
      <div className="menu-container">
        {/* Logo */}
        <div className="logo">
          <img src="/images/cr7.1.jpg" alt="Logo" className="logo-image" />
        </div>

        {/* Menu bên phải */}
        <div className="menu-right">
          {/* Hàng đầu tiên */}
          <div className="top-menu">
            <ul className="menu-list">
              {isLoggedIn ? (
                <>
                  <li className="menu-item">Xin chào, {userName}</li>
                  <li className="menu-item"><Link to="/help" className="menu-link" id="tg">Trợ Giúp</Link></li>
                  <li className="menu-link" onClick={handleLogout} id="dx">Đăng xuất</li>
                </>
              ) : (
                <>
                  <li className="menu-item">
                    <Link to="/help" className="menu-link" id="tg">Trợ Giúp</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/signin" className="menu-link" id="dn">Đăng Nhập</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/signup" className="menu-link" id="dk">Đăng Ký</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Hàng thứ hai */}
          <div className="bottom-menu">
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/my-booking" className="menu-link2">Chuyến bay của tôi</Link>
              </li>
              <li className="menu-item">
                <Link to="/trip-info" className="menu-link2">Thông Tin Hành Trình</Link>
              </li>
              <li className="menu-item">
                <Link to="/flight-services" className="menu-link2">Dịch Vụ Chuyến Bay</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Menu;
