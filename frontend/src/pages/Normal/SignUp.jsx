// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/LoginStyle.css";
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
          alert('Sign Up successful!');
          let inputWithoutEmail = {
            username: input.username,
            password: input.password,
          }
          
          auth.loginAction(inputWithoutEmail, 'user');
          localStorage.setItem('isLoggedIn', 'true');
          return;
        } else {
          alert('Invalid input');
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
        <form className="login-form" onSubmit={handleSubmitEvent}>
          <div className="form-group">
            <label htmlFor="username" className="input-label">Username</label>
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
            <label htmlFor="email" className="input-label">Email</label>
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
            <label htmlFor="password" className="input-label">Password</label>
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
