import EditListSearch from './EditListSearch';
import './Search.scss';

const renderSearch = (findRecipesButton, search, searchIsVisible) => {
    return searchIsVisible ? search : findRecipesButton;
}
const Search = props => {
    const { searchIsVisible, setSearchIsVisible } = props;
    
    // Button to display search feature
    const findRecipesButton = <span onClick={() => setSearchIsVisible(true)} className="search__link">Find More Recipes</span>;
    // Search feature component displayed below list
    const search = <EditListSearch {...props} />;

    return renderSearch(findRecipesButton, search, searchIsVisible);
}

export default Search;