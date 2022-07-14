import axios from 'axios';
import ArrowRightSVG from '../SVGs/ArrowRightSVG';
import Img from './Img';
import './SearchResult.scss'; 

const API_CODE_LETTERS = {
    'ingredient': 'i',
    'category': 'c',
    'cuisine': 'a'
}

const SearchResult = ({ resultImg, resultName, resultType, setFilter, searchEl }) => {

    const getFilteredRecipes = async (name, resultType) => {
        const urlSlug = name.toLowerCase().replace(/ /g, '_');
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${API_CODE_LETTERS[resultType]}=${urlSlug}`);
        setFilter(name, data.meals, resultType);
        // scroll to top of search results after selecting an ingredient / cuisine to filter by
        searchEl.current.scrollIntoView();
    }

    return (
        <div onClick={() => getFilteredRecipes(resultName, resultType)} className="search-result">
            <div className="search-result__wrapper">
                <Img resultImg={resultImg} resultName={resultName} />
                <div>
                    <h3 className="search-result__name">{resultName}</h3>
                    <p className="search-result__type">{resultType}</p>
                </div>
            </div>
            <ArrowRightSVG className="search-result__svg"/>
        </div>
    )
}

export default SearchResult;