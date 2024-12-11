// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/LoginStyle.css';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Xử lý đăng ký
  const handleSignUp = (e) => {
    e.preventDefault();

    // Lưu thông tin vào localStorage và cập nhật trạng thái đăng nhập
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', fullName);

    alert('Sign Up successful!');
    navigate('/home');
  };

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2 className="title">Register</h2>
          <p className="description">Create a new account to get started!</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="full-name" className="input-label">Full Name</label>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your full name"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="action-button">SIGN UP</button>
        </form>

        <div className="login-footer">
          <p>
            Have an account?{' '}
            <span onClick={() => navigate('/signin')} className="toggle-link">
              Sign In
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

export default SignUp;
