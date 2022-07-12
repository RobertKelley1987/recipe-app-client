
import { useEffect, useRef } from 'react';
import CloseSVG from './SVGs/CloseSVG';
import SearchSVG from './SVGs/SearchSVG';
import './Searchbar.scss';

const Searchbar = ({ filterTerm, placeholder, searchVisible, setFilterTerm, setSearchVisible }) => {
    const searchSVG = <SearchSVG className="searchbar__svg searchbar__svg--search" handleClick={() => setSearchVisible(true)}/>;
    const searchInput = useRef(null);

    // Run these events when the component mounts and unmounts
    useEffect(() => {
        // Add focus to input when searchbar becomes visible
        if(searchVisible) {
            searchInput.current.focus();
        }

        // When component unmounts, clear filter term
        return () => setFilterTerm(''); 
    }, [searchVisible]);

    if (searchVisible) {
        return (
            <div className="searchbar__wrapper">
                <div className="searchbar">
                    {searchSVG}
                    <input ref={searchInput} className="searchbar__input" onChange={e => setFilterTerm(e.target.value)} placeholder={placeholder} type="text" value={filterTerm}/>
                </div>
                <CloseSVG className="searchbar__svg searchbar__svg--close" handleClick={() => setSearchVisible(false)}/>
            </div>
        )
    } else {
        return searchSVG;
    }
}

export default Searchbar;