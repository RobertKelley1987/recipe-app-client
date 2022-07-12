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

const configHeadingClasses = searchVisible => {
    let classNames = 'page-w-filter__heading-w-svg';
    return searchVisible ? classNames += ' page-w-filter__heading-w-svg--column' : classNames;
}

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
    const [letterFilterVisible, setLetterFilterVisible] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);
    const { name } = useParams();
    const { filterType, allItems, resultType, userId } = props;

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
        if(searchVisible) {
            setFirstLetter('');
            setLetterFilterVisible(false);
        } else {
            setFirstLetter(initialLetterFilter);
            setLetterFilterVisible(true);
        }
    }, [searchVisible, initialLetterFilter]);

    // If user navigates to a more specific filter, clear search term and letter filter, 
    // then hide search bar
    useEffect(() => {
        setFirstLetter('');
        setFilterTerm('');
        setSearchVisible(false);
    }, [name]);

    // Create new list link component passed from props
    const NewListLink = props.newListLink;

    return (
        <main className="page-w-filter">
            <div className={configHeadingClasses(searchVisible)}>
                <PageHeading filterType={filterType} filterName={name} resultType={resultType} />
                <Searchbar 
                    filterTerm={filterTerm} 
                    placeholder={configPlaceholder(filterType, resultType)} 
                    searchVisible={searchVisible} 
                    setFilterTerm={setFilterTerm} 
                    setSearchVisible={setSearchVisible} 
                />
            </div>
            {NewListLink && <NewListLink setErrorMessage={setErrorMessage} userId={userId} />}
            {letterFilterVisible && <LetterFilter resultType={resultType} firstLetter={firstLetter} setFirstLetter={setFirstLetter} />}
            <PageResults {...props} filterTerm={filterTerm} filterType={filterType} firstLetter={firstLetter} items={filteredResults} />         
        </main>
    )
}

export default PageWithFilter;