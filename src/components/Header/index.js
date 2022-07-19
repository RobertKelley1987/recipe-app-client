import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';
import CloseSVG from '../SVGs/CloseSVG';
import HamburgerSVG from '../SVGs/HamburgerSVG';
import Menu from './Menu';
import UserOptions from './UserOptions';
import './UserOptions.scss';
import './AuthLinks.scss';
import './Header.scss';

const renderSVG = (menuIsVisible, setMenuIsVisible) => {
    if(!menuIsVisible) {
        return <HamburgerSVG className={"header__svg"} handleClick={() => setMenuIsVisible(true)} />;
    } else {
        return <CloseSVG className={"header__svg"} handleClick={() => setMenuIsVisible(false)} />
    }
}

const Header = props => {
    const { menuIsVisible, setMenuIsVisible, userId } = props;

    return (
        <header className={!menuIsVisible ? "header" : "header header--green"}>
            {menuIsVisible && <Menu setMenuIsVisible={setMenuIsVisible} />}
            {userId && renderSVG(menuIsVisible, setMenuIsVisible)}
            <Link to="/">
                <h1 className="header__app-name">recipe finder</h1>
            </Link>
            {!userId ? <AuthLinks /> : <UserOptions {...props} menuIsVisible={menuIsVisible} />}
        </header>
    );
}

export default Header;