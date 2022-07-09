import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { filterByFirstLetter, filterBySearchTerm } from './util/filter-functions';
import { PLURAL_TYPES } from './util/plural-types';
import { PROP_NAMES } from './util/parse-api-results';
import { URL_CODE_LETTERS } from './util/url-code-letters';
import { sortIngredients } from './util/sort-functions';
import PageResults from './PageResults';
import LetterFilter from './LetterFilter';
import PageHeading from './PageHeading';
import Searchbar from './Searchbar';
import './PageWithSearch.scss';

const configHeadingClasses = searchVisible => {
    let classNames = 'page-w-search__heading-w-svg';
    return searchVisible ? classNames += ' page-w-search__heading-w-svg--column' : classNames;
}

const PageWithSearch = props => {
    let initialLetterFilter = props.resultType === 'ingredient' ? 'A' : '';

    const [allItems, setAllItems] = useState([]);
    const [firstLetter, setFirstLetter] = useState(initialLetterFilter);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');
    const [letterFilterVisible, setLetterFilterVisible] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);

    const { name } = useParams();

    const { filterType, resultType } = props;

    const configURL = (filterType, resultType) => {
        if(resultType !== 'recipe') {
            return `https://www.themealdb.com/api/json/v1/1/list.php?${URL_CODE_LETTERS[filterType]}=list`;
        } else {
            return `https://www.themealdb.com/api/json/v1/1/filter.php?${URL_CODE_LETTERS[filterType]}=${name}`
        }
    }

    useEffect(() => { 
        const getItems = async () => {
            const { data } = await axios.get(configURL(filterType, resultType));
            // Test if results are going to be ingredients
            if(resultType === 'ingredient') {
                // Sort ingredients by name before saving to component state
                // The other result types seem to alphabetize automatically... but not this one.
                let sortedIngredients = data.meals.sort((a, b) => sortIngredients(a, b));
                setAllItems(sortedIngredients);
            } else {
                setAllItems(data.meals);
            }
        }
        
        getItems();
    }, [filterType, resultType]);

    // update filtered results after a letter in the letter filter is selected
    useEffect(() => {
        // test if letter selected is empty string
        if(!firstLetter) {
            // set filtered results to all items
            setFilteredResults(allItems);
        } else {
            // set filtered results to items starting with the letter selected
            const filteredResults = filterByFirstLetter(allItems, firstLetter, PROP_NAMES[resultType].nameProp);
            setFilteredResults(filteredResults);
        }
    }, [firstLetter, allItems]);

    // update filtered results as user updates search term
    useEffect(() => {
        let timeoutId;

        if(filterTerm) {
            timeoutId = setTimeout(() => {
                // filter results by filter term and update state
                filterBySearchTerm(allItems, setFilteredResults, PROP_NAMES[resultType].nameProp, filterTerm); 
            }, 400);
        }
        
        // clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [filterTerm, allItems]);

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
    }, [searchVisible]);

    // If user navigates to a more specific filter, clear search term and letter filter, 
    // then hide search bar
    useEffect(() => {
        setFirstLetter('');
        setFilterTerm('');
        setSearchVisible(false);
    }, [name]);

    console.log("INSIDE PAGE SEARCH: " + resultType)

    return (
        <main className="page-w-search">
            <div className={configHeadingClasses(searchVisible)}>
                <PageHeading filterType={filterType} filterName={name} resultType={resultType} />
                <Searchbar 
                    filterTerm={filterTerm} 
                    placeholder={`search all ${PLURAL_TYPES[filterType]}`} 
                    searchVisible={searchVisible} 
                    setFilterTerm={setFilterTerm} 
                    setSearchVisible={setSearchVisible} 
                />
            </div>
            {letterFilterVisible && <LetterFilter resultType={resultType} firstLetter={firstLetter} setFirstLetter={setFirstLetter} />}
            <PageResults {...props} filterTerm={filterTerm} filterType={filterType} firstLetter={firstLetter} items={filteredResults} />         
        </main>
    )
}

export default PageWithSearch;