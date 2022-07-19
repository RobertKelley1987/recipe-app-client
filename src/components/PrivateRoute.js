import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children, path, userId }) => {
    return userId ? <Route path={path} element={children} /> : <Navigate to="/login" />
}