import { Link } from 'react-router-dom';
import HamburgerSVG from '../SVGs/HamburgerSVG';
import UserOptions from './UserOptions';
import './UserOptions.scss';
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

const Header = ({ userId, setUserId }) => {
    return (
        <header className="header">
            {userId && <HamburgerSVG className={"header__svg"}/>}
            <Link to="/">
                <h1 className="header__app-name">recipe finder</h1>
            </Link>
            {!userId ? <AuthLinks /> : <UserOptions setUserId={setUserId} />}
        </header>
    );
}

export default Header;