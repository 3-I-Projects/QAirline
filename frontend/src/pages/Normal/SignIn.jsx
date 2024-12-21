import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/LoginStyle.css';
import { useAuth } from '../../context/AuthContext';
import Menu from '../../Menu';

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

		alert('Phương thức nhập không hợp lệ');
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

			<div className="menu">
                <Menu />
            </div>
			<div className="login-container">
				<div className="login-card">
					{/* Header */}
					<div className="login-header">
						<h2 className="title">Đăng nhập</h2>
						<p className="description">Nhập tên người dùng và mật khẩu để đăng nhập.</p>
					</div>

					{/* Form */}
					<form className="login-form" onSubmit={handleSubmitEvent}>
						<div className="form-group">
							<label htmlFor="login-username" className="input-label">Tên người dùng</label>
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
							<label htmlFor="login-password" className="input-label">Mật khẩu</label>
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
							Quên mật khẩu?
						</a>

						<button type="submit" className="action-button">
							Đăng nhập
						</button>
					</form>

					{/* Footer */}
					<div className="login-footer">
						<p>
							Chưa có tài khoản?{' '}
							<span onClick={() => navigate('/signup')} className="toggle-link">
								Đăng ký
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

export default SignIn;
