import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import ChangeInfoForm from '../../components/ChangeInfoForm';
import { useNavigate } from 'react-router-dom';
import '../../style/User.css';

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
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success updating user info:', data);
                setUserInfo(data);
                setDisplayUsernameForm(false);
                setDisplayEmailForm(false);
                setDisplayPasswordForm(false);
            })
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    }

    return (
        <div className='user-container'>
            <div className='user'>
            <h1>User Profile</h1>
            {displayUsernameForm ? (
                <ChangeInfoForm 
                    name={'Username'} 
                    value={userInfo.username} 
                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} 
                    handleSubmit={() => submit('username', userInfo.username)}
                />
            ) : userInfo.username ? (
                <div className='user-infor'>
                    <label>Username:</label>
                    <span>{userInfo.username}</span>
                </div>
            ) : (
                <div className='user-infor'>
                    <label>Username:</label>
                    <span>How</span>
                </div>
            )}
            <button onClick={() => setDisplayUsernameForm(!displayUsernameForm)}>Edit Username</button>
            {displayEmailForm ? (
                <ChangeInfoForm 
                    name={'Email'} 
                    value={userInfo.email} 
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} 
                    handleSubmit={() => submit('email', userInfo.email)}
                />
            ) : userInfo.email ? (
                <div className='user-infor'>
                    <label>Email:</label>
                    <span>{userInfo.email}</span>
                </div>
            ) : (
                <div className='user-infor'>
                    <label>Email:</label>
                    <span>Nothing</span>
                </div>
            )}
            <button onClick={() => setDisplayEmailForm(!displayEmailForm)}>Edit Email</button>
            {displayPasswordForm && (
                <ChangeInfoForm 
                    name={'Password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    handleSubmit={() => submit('password', password)}
                />
            )}
            <div className='btn-container'>
                <button onClick={() => setDisplayPasswordForm(!displayPasswordForm)}>Change Password</button>
                <button onClick={() => navigate('/home')}>Home</button>
            </div>
            </div>
        </div>
    );
};

export default UserProfile;