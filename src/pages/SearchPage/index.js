import SearchPageResults from './SearchPageResults';
import SearchWrapper from '../../components/SearchWrapper';
import './SearchPage.scss';


const SearchPage = props => {
    return (
        <main className="search-page">
            <SearchWrapper {...props} isSearchPage={true} displayResults={SearchPageResults} />
        </main>
    );
}

export default SearchPage;