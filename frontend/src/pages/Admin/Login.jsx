import { React, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../style/AdminGlobal.css'
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
    const navigate = useNavigate();

    // if admin not logged out, navigate to /dashboard
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            navigate('/admin/dashboard');
        }
        return;
    });

    const [input, setInput] = useState({
        username: '',
        password: '',
    });

    const auth = useAuth();
    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (input.username !== '' && input.password !== '') {
            if (await auth.loginAction(input, 'admin') === 1) {
                toast.success('Login successful');
                return;
            }
            toast.error(await auth.loginAction(input, 'admin'));
            return;
        }

        toast.error('Invalid input');
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <form onSubmit={handleSubmitEvent}>
            <Toaster />
            <div className='form_control'>
                <label htmlFor="user-username">Username:</label><br />
                <input
                    type="text"
                    id='user-username'
                    name='username'
                    placeholder=''
                    onChange={handleInput}
                />
                {/* <div id='user-username' className='sr-only'>
                    Please enter a valid username. It must contain at least 6 characters.
                </div> */}
            </div>
            <div className="form_control">
                <label htmlFor="password">Password:</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                {/* <div id="user-password" className="sr-only">
                    Your password should be more than 6 character
                </div> */}
            </div>
            <button className="btn-submit">Login</button>
        </form>
    );
};

export default Login;
