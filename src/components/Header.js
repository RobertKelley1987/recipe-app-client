import { Link } from 'react-router-dom';
import './AuthLinks.scss';
import './Header.scss';

const AuthLinks = () => {
    return (
        <div className="auth-links">
            <Link className="auth-links__link" to='/signup'>Sign Up</Link>
            <Link className="auth-links__link" to='/login'>Log In</Link>
        </div>
    )
}

const Header = ({ userId }) => {
    return (
        <header className="header">
            <h1 className="header__app-name">recipe finder</h1>
            <AuthLinks />
        </header>
    );
}

export default Header;