import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import ChangeInfoForm from '../../components/ChangeInfoForm';
import { useNavigate } from 'react-router-dom';
import Menu from '../../Menu';
import '../../style/User.css';
import Footer from '../../components/Footer';


const UserProfile = () => {
    // const {} = useContext(AuthContext);
    const username = localStorage.getItem('username');
    const [ displayEmailForm, setDisplayEmailForm ] = useState(false);
    const [ displayUsernameForm, setDisplayUsernameForm ] = useState(false);
    const [ displayPasswordForm, setDisplayPasswordForm ] = useState(false);
    const [ password, setPassword ] = useState('');
    const { accessToken, userInfo, setUserInfo } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const headers = {}
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`
            }
            
            fetch('http://localhost:8000/users/info', {
                headers: headers,
            })
            .then(response => response.json())
            .then(data => {setUserInfo(data);})
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }, []);

    useEffect(() => {localStorage.setItem('username', userInfo.username)}, [userInfo]);

    async function submit(name, value) {
        
        console.log('submitting', name);
        try {
            const data = {[name]: value};
            console.log(data);
            fetch(`http://localhost:8000/users/users/${userInfo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi mạng');
                }
                return response.json();
            })
            .then(data => {
                console.log('Cập nhật tài khoản thành công:', data);
                setUserInfo(data);
                setDisplayUsernameForm(false);
                setDisplayEmailForm(false);
                setDisplayPasswordForm(false);
            })
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
        }
    }

    return (
        <>
            <div className='user-container'>
                <div className='menu'>
                    <Menu />
                </div>
                <div className='user'>
                <h1>Tài khoản</h1>
                {displayUsernameForm ? (
                    <ChangeInfoForm 
                    name={'Tên tài khoản'} 
                        value={userInfo.username} 
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} 
                        handleSubmit={() => submit('username', userInfo.username)}
                        />
                ) : userInfo.username ? (
                    <div className='user-infor'>
                        <label>Tên tài khoản:</label>
                        <span>{userInfo.username}</span>
                    </div>
                ) : (
                    <div className='user-infor'>
                        <label>Tên tài khoản:</label>
                        <span>Hết cíu</span>
                    </div>
                )}
                <button onClick={() => setDisplayUsernameForm(!displayUsernameForm)}>Đổi tên</button>
                {displayEmailForm ? (
                    <ChangeInfoForm 
                        name={'Email'} 
                        value={userInfo.email} 
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} 
                        handleSubmit={() => submit('email', userInfo.email)}
                    />
                ) : userInfo.email ? (
                    <div className='user-infor'>
                        <label>Địa chỉ email:</label>
                        <span>{userInfo.email}</span>
                    </div>
                ) : (
                    <div className='user-infor'>
                        <label>Địa chỉ email:</label>
                        <span>Hết cíu</span>
                    </div>
                )}
                <button onClick={() => setDisplayEmailForm(!displayEmailForm)}>Đổi email</button>
                {displayPasswordForm && (
                    <ChangeInfoForm 
                        name={'Mật khẩu'} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        handleSubmit={() => submit('password', password)}
                    />
                )}
                <div className='btn-container'>
                    <button onClick={() => setDisplayPasswordForm(!displayPasswordForm)}>Đổi mật khẩu</button>
                    <button onClick={() => navigate('/home')}>Trang chủ</button>
                </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;