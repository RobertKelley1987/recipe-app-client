import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSVG from '../SVGs/UserSVG';

const UserOptions = ({ setUserId }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const optionsWrapper = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const clickOutsideToClose = e => {
            if(optionsWrapper.current.contains(e.target)) {
                return
            }
            setDropdownIsOpen(false);
        }

        document.body.addEventListener('click',clickOutsideToClose);

        return () => document.body.removeEventListener('click', clickOutsideToClose);
    }, []);

    const signOut = async () => {
        const { data } = await axios.post('/logout');
        if(data.userId === null) {
            setUserId(null);
            navigate('/login')
        }
    }

    return (
        <div ref={optionsWrapper} className="user-options">
            <div onClick={() => setDropdownIsOpen(!dropdownIsOpen)} className="user-options__svg-wrapper">
                <UserSVG className="user-options__svg"/>
            </div>
            {dropdownIsOpen && <div className="user-options__dropdown">
                <button className="user-options__button" onClick={signOut}>Sign Out</button>
            </div>}
        </div>
    )
}

export default UserOptions;