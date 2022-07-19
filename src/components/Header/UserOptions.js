import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../services/User';
import UserSVG from '../SVGs/UserSVG';

const configClassNames = menuIsVisible => {
    let classNames = 'user-options__svg-wrapper';
    if(menuIsVisible) {
        classNames += ` ${classNames}--menu`
    }
    return classNames;
}

const UserOptions = ({ menuIsVisible, setErrorMessage, setUserId }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const optionsWrapper = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const clickOutsideToClose = e => {
            if(!optionsWrapper || !optionsWrapper.current) {
                return
            }

            if(optionsWrapper.current.contains(e.target)) {
                return
            }
            
            setDropdownIsOpen(false);
        }
        document.body.addEventListener('click',clickOutsideToClose);
        return () => document.body.removeEventListener('click', clickOutsideToClose);
    }, []);

    const signOut = async ()  => {
        const data = await User.logOut();
        // Test for successful sign out
        if(data.userId === null) {
            // Update app state to reflect no user and redirect to login
            setUserId(null);
            navigate('/login')
        } else {
            // Otherwise display error message
            setErrorMessage('Log out failed. Please try again.');
        }   
    }

    return (
        <div ref={optionsWrapper} className="user-options">
            <div onClick={() => setDropdownIsOpen(!dropdownIsOpen)} className={configClassNames(menuIsVisible)}>
                <UserSVG className="user-options__svg"/>
            </div>
            {dropdownIsOpen && <div className="user-options__dropdown">
                <button className="user-options__button" onClick={signOut}>Sign Out</button>
            </div>}
        </div>
    )
}

export default UserOptions;