import { useEffect, useRef } from 'react';
import CloseSVG from './SVGs/CloseSVG';
import SearchSVG from './SVGs/SearchSVG';
import './Searchbar.scss';

const Searchbar = ({ extraMargin, filterTerm, placeholder, searchIsVisible, updateSearchTerm, setSearchIsVisible }) => {
    const searchSVG = <SearchSVG className="searchbar__svg searchbar__svg--search" handleClick={() => setSearchIsVisible(true)}/>;
    const searchInput = useRef(null);

    // Run these events when the component mounts and unmounts
    useEffect(() => {
        // Add focus to input when searchbar becomes visible
        if(searchIsVisible) {
            searchInput.current.focus();
        }

        // When component unmounts, clear filter term
        return () => updateSearchTerm(''); 
    }, [searchIsVisible, updateSearchTerm]);

    if (searchIsVisible) {
        return (
            <div className={extraMargin ? "searchbar__wrapper searchbar__wrapper--extra-margin" : "searchbar__wrapper"}>
                <div className="searchbar">
                    {searchSVG}
                    <input ref={searchInput} className="searchbar__input" onChange={e => updateSearchTerm(e.target.value)} placeholder={placeholder} type="text" value={filterTerm} />
                </div>
                {searchIsVisible && <CloseSVG className="searchbar__svg searchbar__svg--close" handleClick={() => setSearchIsVisible(false)} />}
            </div>
        )
    } else {
        return searchSVG;
    }
}

export default Searchbar;