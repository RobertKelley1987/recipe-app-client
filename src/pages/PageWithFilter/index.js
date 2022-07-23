import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { hasResults } from '../../util/has-results';
import { PLURAL_TYPES } from '../../util/plural-types';
import { configClassNames } from '../../util/config-classnames';
import useFilteredResults from '../../hooks/useFilteredResults';
import LoadingWrapper from '../../components/LoadingWrapper';
import PageResults from './PageResults';
import LetterFilter from './LetterFilter';
import PageHeading from './PageHeading';
import Searchbar from '../../components/Searchbar';
import './PageWithFilter.scss';

// Function to configure placeholder phrase for search bar
const configPlaceholder = (filterType, resultType) => {
    if(resultType === filterType) {
        return `search all ${PLURAL_TYPES[filterType]}`;
    } else {
        return `search in ${filterType}`
    }
}

const PageWithFilter = props => {
    const { allItems, filterType, isLoading, resultType, setErrorMessage, userId } = props;
    const [firstLetter, setFirstLetter] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const { filteredResults } = useFilteredResults(allItems, filterTerm, firstLetter, resultType);
    const [letterFilterIsVisible, setLetterFilterIsVisible] = useState(true);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { name } = useParams();

    // Scroll to top of page on initial render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Hide first letter filter when search bar is visible.
    // Likewise, make letter filter visible if search bar is not visible.
    useEffect(() => {
        if(searchIsVisible) {
            setLetterFilterIsVisible(false);
        } else {
            setLetterFilterIsVisible(true);
        }
    }, [searchIsVisible]);

    // If user navigates to a more specific filtered results page, clear search term and 
    // letter filter, then hide search bar
    useEffect(() => {
        setFirstLetter('');
        setFilterTerm('');
        setSearchIsVisible(false);
    }, [name]);

    // Create new list link component passed from props
    const NewListLink = props.newListLink;

    return (
        <main className="page-w-filter">
            <header className={configClassNames('page-w-filter__heading-w-svg', searchIsVisible, 'column')}>
                <PageHeading filterType={filterType} filterName={name} resultType={resultType} />
                <Searchbar 
                    extraMargin={true}
                    searchTerm={filterTerm} 
                    placeholder={configPlaceholder(filterType, resultType)} 
                    searchIsVisible={searchIsVisible} 
                    setSearchTerm={setFilterTerm} 
                    setSearchIsVisible={setSearchIsVisible} 
                />
            </header>
            {NewListLink && <NewListLink setErrorMessage={setErrorMessage} userId={userId} />}
            {letterFilterIsVisible && hasResults(allItems) && <LetterFilter resultType={resultType} firstLetter={firstLetter} setFirstLetter={setFirstLetter} />}
            <LoadingWrapper isLoading={isLoading}>
                <PageResults {...props} filterTerm={filterTerm} filterType={filterType} firstLetter={firstLetter} filteredResults={filteredResults} />
            </LoadingWrapper>         
        </main>
    )
}

export default PageWithFilter;