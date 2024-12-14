import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth.accessToken ? <Outlet /> : <Navigate to="/admin" />;
}

export default PrivateRoute;