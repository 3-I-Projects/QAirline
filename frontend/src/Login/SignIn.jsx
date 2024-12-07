// SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LoginStyle.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Điều hướng

  // Xử lý đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();

    // Logic kiểm tra thông tin đăng nhập (giả sử thành công)
    if (email === 'a@gmail.com' && password === 'a') {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful!');
      navigate('/home'); // Điều hướng đến trang Home
    } else {
      alert('Invalid email or password!');
    }
  };

  // Điều hướng đến trang chủ
  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2 className="title">Sign In</h2>
          <p className="description">Use your email and password to log in.</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email" className="input-label">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="input-label">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <a href="#" className="forgot-password">
            Forgot Your Password?
          </a>

          <button type="submit" className="action-button">
            SIGN IN
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} className="toggle-link">
              Sign Up
            </span>
          </p>
          <button onClick={goToHome} className="action-button">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
