import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, userId }) => {
    return !userId ? <Navigate to="/login" /> : children;
}

export default PrivateRoute;