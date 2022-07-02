import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchResult from './SearchResult';
import CloseSVG from './SVGs/CloseSVG';
import SearchSVG from './SVGs/SearchSVG';
import './SearchSection.scss';

const SearchSection = ({ list, listId, setList, setSearchIsVisible }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getResults = async searchTerm => {
            const { data } = await axios.get(`https:///www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            setResults(data.meals);
        }

        let timeoutId = setTimeout(() => {
            if(searchTerm) {
                getResults(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
    <section className="search-section">
        <div className="search-section__searchbar-wrapper">
            <div className="search-section__searchbar">
                <SearchSVG className="search-section__svg"/>
                <input className="search-section__input" placeholder="search" onChange={e => setSearchTerm(e.target.value)} type="text" value={searchTerm}/>
            </div>
            <CloseSVG className="search-section__svg" handleClick={() => setSearchIsVisible(false)} />
        </div>
        <div className="search-section__results">
            {results && results.map(recipe => <SearchResult key={recipe.idMeal} listId={listId} recipe={recipe} setList={setList} />)}
        </div>
    </section>
    )


}

export default SearchSection;