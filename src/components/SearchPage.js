import SearchPageResults from './SearchWrapper/SearchPageResults';
import SearchWrapper from './SearchWrapper/SearchWrapper';
import './SearchPage.scss';


const SearchPage = props => {
    return (
        <main className="search-page">
            <SearchWrapper {...props} isSearchPage={true} displayResults={SearchPageResults} />
        </main>
    );
}

export default SearchPage;