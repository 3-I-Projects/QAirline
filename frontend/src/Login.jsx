import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LoginStyle.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate(); // Điều hướng

  const handleLogin = (e) => {
    e.preventDefault();

    // Logic kiểm tra thông tin đăng nhập (giả sử thành công)
    if (email === 'a@gmail.com' && password === 'a') {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful!');
      navigate('/Home'); // Điều hướng đến Home
    } else {
      alert('Invalid email or password!');
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const goToHome = () => {
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <div className={`login-card ${isSignUp ? 'sign-up-active' : ''}`}>
        {/* Header */}
        <div className="login-header">
          <h2 className="title">{isSignUp ? 'Register' : 'Sign In'}</h2>
          <p className="description">
            {isSignUp
              ? 'Create a new account to get started!'
              : 'Use your email and password to log in.'}
          </p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={isSignUp ? null : handleLogin}>
          {isSignUp ? (
            <>
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

              <button type="submit" className="action-button">
                SIGN UP
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </form>

        {/* Footer */}
        <div className="login-footer">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <span onClick={toggleForm} className="toggle-link">
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span onClick={toggleForm} className="toggle-link">
                Sign Up
              </span>
            </p>
          )}
          <button onClick={goToHome} className="action-button">
          Go to Home
        </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
