import { Link } from 'react-router-dom';

const AuthLinks = () => {    
    return (
        <div className="auth-links">
            <Link className="auth-links__link" to='/signup'>Sign Up</Link>
            <Link className="auth-links__link" to='/login'>Log In</Link>
        </div>
    )
}

export default AuthLinks;