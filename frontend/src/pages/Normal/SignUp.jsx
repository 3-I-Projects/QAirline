// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/LoginStyle.css";
import Menu from "../../Menu";
import { useAuth } from '../../context/AuthContext'

function SignUp() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    email: '',
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (input.username !== '' && input.password !== '' && input.email !== '') {      
      try {
        const response = await fetch('http://localhost:8000/users/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });

        if (!response.ok) {
          alert('Username already exists! Please go to login page.');
          return;
        }

        const res = await response.json();

        if (res) {
          alert('Đăng ký thành công!');
          let inputWithoutEmail = {
            username: input.username,
            password: input.password,
          }
          
          auth.loginAction(inputWithoutEmail, 'user');
          localStorage.setItem('isLoggedIn', 'true');
          return;
        } else {
          alert('Phương thức nhập không hợp lệ');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      <div className='menu'>
          <Menu />
      </div>
      <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2 className="title">Đăng ký</h2>
          <p className="description">Tạo tài khoản mới để bắt đầu!</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmitEvent}>
          <div className="form-group">
            <label htmlFor="username" className="input-label">Tên người dùng</label>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your username"
              className="input-field"
              name="username"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="input-label">Địa chỉ email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              name="email"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">Mật khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="input-field"
              name="password"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className="action-button">Đăng ký</button>
        </form>

        <div className="login-footer">
          <p>
            Đã có tài khoản?{' '}
            <span onClick={() => navigate('/signin')} className="toggle-link">
              Đăng nhập
            </span>
          </p>
          <button onClick={() => navigate('/home')} className="action-button">
            Trang chủ
          </button>
        </div>
      </div>
      </div>
    </div>
    
  );
}

export default SignUp;
