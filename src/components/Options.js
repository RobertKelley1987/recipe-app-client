import { useEffect, useRef } from 'react';
import MoreSVG from './SVGs/MoreSVG';
import './Options.scss';

const Options = ({ children, dropdown, dropdownIsVisible, listId, recipeId, setDropdownIsVisible }) => {
    const dropdownWrapper = useRef(null);

    const Dropdown = dropdown;

    useEffect(() => {
        const handleClick = e => {
            // Test if user has clicked inside of dropdown wrapper
            if(dropdownWrapper && dropdownWrapper.current && dropdownWrapper.current.contains(e.target)) {
                // Do nothing
                return
            }
            // Close dropdown menu
            setDropdownIsVisible(false);
        }

        // Add listener to window when this component renders
        window.addEventListener('click', handleClick);

        // Remove this listener when the component unmounts
        return () => window.removeEventListener('click', handleClick);
    }, [setDropdownIsVisible]);

    return (
        <div className="options">
            {children}
            <div className="options__more-wrapper" ref={dropdownWrapper}>
                <MoreSVG className="options__svg" handleClick={() => setDropdownIsVisible(!dropdownIsVisible)}/>
                {dropdownIsVisible 
                    && <Dropdown 
                            dropdownIsVisible={dropdownIsVisible} 
                            listId={listId} 
                            recipeId={recipeId} 
                            setDropdownIsVisible={setDropdownIsVisible} 
                        />
                }
            </div>
        </div>
    );
}

export default Options;