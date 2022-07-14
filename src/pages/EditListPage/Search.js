import SearchResultsList from '../../components/SearchWrapper/SearchResultsList';
import SearchWrapper from '../../components/SearchWrapper';
import './Search.scss';

const Search = props => {
    const { searchIsVisible, setSearchIsVisible } = props;
    
    // Test if search is visible
    if(searchIsVisible) { 
        // Display searchbar with results 
        return <SearchWrapper {...props} displayResults={SearchResultsList} />;
    } else {
        // Display link to open searchbar with results
        return <span onClick={() => setSearchIsVisible(true)} className="search__link">Find Recipes</span>;
    }
}

export default Search;