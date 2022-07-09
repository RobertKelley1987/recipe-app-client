import BrowseResults from './BrowseResults';
import LetterFilter from './LetterFilter';
import Searchbar from './Searchbar';
import './BrowseByPage.scss';
import { PLURAL_TYPES } from './util/plural-types';

const configHeadingClasses = searchVisible => {
    let classNames = 'browse-by-page__heading-w-svg';
    return searchVisible ? classNames += ' browse-by-page__heading-w-svg--column' : classNames;
}

const BrowseByPage = props => {

    const { filterTerm, filteredResults, filterType, letterFilterVisible, searchVisible, setFilterTerm, setSearchVisible } = props;

    return (
        <main className="browse-by-page">
            <div className={configHeadingClasses(searchVisible)}>
                <h1 className="browse-by-page__heading">Browse by {filterType}</h1>
                <Searchbar 
                    filterTerm={filterTerm} 
                    placeholder={`search all ${PLURAL_TYPES[filterType]}`} 
                    searchVisible={searchVisible} 
                    setFilterTerm={setFilterTerm} 
                    setSearchVisible={setSearchVisible} 
                />
            </div>
            {/* Show filter by letter options for ingredients list only (...it's a long list) */}
            {letterFilterVisible && <LetterFilter {...props} />}
            <BrowseResults {...props} items={filteredResults} />         
        </main>
    )
}

export default BrowseByPage;