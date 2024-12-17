import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/LoginStyle.css';
import { useAuth } from '../../context/AuthContext';

function SignIn() {
	const [input, setInput] = useState({
		username: '',
		password: '',
	});

	const navigate = useNavigate(); // Điều hướng
	const auth = useAuth();
	const handleSubmitEvent = (e) => {
		e.preventDefault();

		if (input.username !== '' && input.password !== '') {
			auth.loginAction(input, 'user');
			localStorage.setItem('isLoggedIn', 'true');
			navigate('/home');
			return;
		}

		alert('invalid input');
	};

	const handleInput = (e) => {
		const { name, value } = e.target;

		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className='login'>
			<div className="login-container">
				<div className="login-card">
					{/* Header */}
					<div className="login-header">
						<h2 className="title">Sign In</h2>
						<p className="description">Use your username and password to log in.</p>
					</div>

					{/* Form */}
					<form className="login-form" onSubmit={handleSubmitEvent}>
						<div className="form-group">
							<label htmlFor="login-username" className="input-label">Username</label>
							<input
								id="login-username"
								type="text"
								placeholder="Enter your username"
								className="input-field"
								name='username'
								onChange={handleInput}
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
								name='password'
								onChange={handleInput}
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
						<button onClick={() => navigate('/home')} className="action-button">
							Go to Home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
