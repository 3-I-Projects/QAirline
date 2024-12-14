import { createContext, useState, useContext, Children } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const loginAction = async (data) => {
        console.log(JSON.stringify(data));
        
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();
            if (res) {
                console.log(res);
                
                // setUser(res.data.user);
                setAccessToken(res.access);
                localStorage.setItem('accessToken', res.access);
                navigate('/admin/dashboard');
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const logoutAction = () => {
        setUser(null);
        setAccessToken('');
        localStorage.removeItem('token');
        navigate('/admin');
    }

    return(
        <AuthContext.Provider  value={{ user, accessToken, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}