import useDropdown from '../hooks/useDropdown';
import MoreSVG from './SVGs/MoreSVG';
import './Options.scss';

const Options = ({ children, dropdown, dropdownIsVisible, listId, recipeId, setDropdownIsVisible }) => {
    const { dropdownWrapper } = useDropdown(setDropdownIsVisible);

    const Dropdown = dropdown;

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