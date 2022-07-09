import SearchWrapper from './SearchWrapper/SearchWrapper';
import './SearchPage.scss';

const SearchPage = props => {
    return (
        <main className="search-page">
            <SearchWrapper isSearchPage={true} {...props} />
        </main>
    );
}

export default SearchPage;