import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { filterByFirstLetter, filterBySearchTerm } from './util/filter-functions';
import { PLURAL_TYPES } from './util/plural-types';
import { PROP_NAMES } from './util/parse-result-props';
import PageResults from './PageResults';
import LetterFilter from './LetterFilter';
import PageHeading from './PageHeading';
import Searchbar from './Searchbar';
import './PageWithFilter.scss';

// Function to configure class names for heading element
const configHeadingClasses = searchIsVisible => {
    let classNames = 'page-w-filter__heading-w-svg';
    return searchIsVisible ? classNames += ' page-w-filter__heading-w-svg--column' : classNames;
}

// Function to configure placeholder phrase for search bar
const configPlaceholder = (filterType, resultType) => {
    if(resultType === filterType) {
        return `search all ${PLURAL_TYPES[filterType]}`;
    } else {
        return `search in ${filterType}`
    }
}

const PageWithFilter = props => {
    let initialLetterFilter = props.resultType === 'ingredient' ? 'A' : '';
    const [errorMessage, setErrorMessage] = useState('');
    const [firstLetter, setFirstLetter] = useState(initialLetterFilter);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');
    const [letterFilterIsVisible, setLetterFilterIsVisible] = useState(true);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { name } = useParams();
    const { filterType, allItems, resultType, userId } = props;

    // Scroll to top of page on initial render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update filtered results after a letter in the letter filter is selected
    useEffect(() => {
        // Test if letter selected is empty string
        if(!firstLetter) {
            // Set filtered results to all items
            setFilteredResults(allItems);
        } else {
            // Set filtered results to items starting with the letter selected
            const filteredResults = filterByFirstLetter(allItems, firstLetter, PROP_NAMES[resultType].nameProp);
            setFilteredResults(filteredResults);
        }
    }, [firstLetter, allItems, resultType]);

    // Update filtered results as user updates input element
    useEffect(() => {
        let timeoutId;

        if(filterTerm) {
            timeoutId = setTimeout(() => {
                // Filter results by filter term and update state
                filterBySearchTerm(allItems, setFilteredResults, PROP_NAMES[resultType].nameProp, filterTerm); 
            }, 400);
        } else {
            setFilteredResults(allItems);
        }
        
        // Clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [filterTerm, allItems, resultType]);

    // Hide first letter filter when search bar is visible.
    // Likewise, make letter filter visible if search bar is not visible.
    useEffect(() => {
        if(searchIsVisible) {
            setFirstLetter('');
            setLetterFilterIsVisible(false);
        } else {
            setFirstLetter(initialLetterFilter);
            setLetterFilterIsVisible(true);
        }
    }, [searchIsVisible, initialLetterFilter]);

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
            <header className={configHeadingClasses(searchIsVisible)}>
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
            {letterFilterIsVisible && <LetterFilter resultType={resultType} firstLetter={firstLetter} setFirstLetter={setFirstLetter} />}
            <PageResults {...props} filterTerm={filterTerm} filterType={filterType} firstLetter={firstLetter} items={filteredResults} />         
        </main>
    )
}

export default PageWithFilter;