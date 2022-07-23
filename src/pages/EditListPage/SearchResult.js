import ArrowRightSVG from '../../components/SVGs/ArrowRightSVG';
import Img from './Img';
import './SearchResult.scss'; 

const SearchResult = ({ fetchRecipesFn, resultImg, resultName, resultType, setFilter, searchEl }) => {

    const getFilteredRecipes = async (name, resultType) => {
        const urlSlug = name.toLowerCase().replace(/ /g, '_');
        // Fetch recipes filtered by this result using function from props. 
        // Ex: If this search result is ingredient mayo, function should fetch all recipes that use mayo. 
        const data = await fetchRecipesFn(urlSlug);
        // Set appropriate filter states in SearchWrapper component. 
        // 3 args are used to set filteredBy, filteredResults and filterType states.
        setFilter(name, data.meals, resultType);
        // Scroll to top of search results
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