import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import ChangeInfoForm from '../../components/ChangeInfoForm';

const UserProfile = () => {
    // const {} = useContext(AuthContext);
    const username = localStorage.getItem('username');
    const [ displayEmailForm, setDisplayEmailForm ] = useState(false);
    const [ displayUsernameForm, setDisplayUsernameForm ] = useState(false);
    const [ displayPasswordForm, setDisplayPasswordForm ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [userInfo, setUserInfo] = useState({
        email: '',
        id: 0,
        username: '',
        booked_tickets: [],
        customers: []
    });
    const { accessToken } = useContext(AuthContext);
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
        <div>
            <h1>User Profile</h1>
            {displayUsernameForm ? (
                <ChangeInfoForm 
                    name={'Username'} 
                    value={userInfo.username} 
                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} 
                    handleSubmit={() => submit('username', userInfo.username)}
                />
            ) : userInfo.username ? (
                <div>
                    <label>Username:</label>
                    <span>{userInfo.username}</span>
                </div>
            ) : (
                <div>
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
                <div>
                    <label>Email:</label>
                    <span>{userInfo.email}</span>
                </div>
            ) : (
                <div>
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
            <button onClick={() => setDisplayPasswordForm(!displayPasswordForm)}>Change Password</button>

        </div>
    );
};

export default UserProfile;