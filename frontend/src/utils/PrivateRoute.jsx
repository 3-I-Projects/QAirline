import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // return auth.accessToken ? <Outlet /> : <Navigate to="/admin" />;
    if (jwtDecode(auth.accessToken).is_admin === true) {
        return <Outlet/>
    } else if (auth.accessToken) {
        return <Navigate to="/"/>
    }
    return <Outlet/>
}

export default PrivateRoute;