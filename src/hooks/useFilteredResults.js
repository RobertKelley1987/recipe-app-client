import { useEffect, useState } from 'react';
import { filterByFirstLetter, filterBySearchTerm } from '../util/filter-functions';
import { PROP_NAMES } from '../util/parse-result-props';

const useFilteredResults = (allItems, filterTerm, firstLetter, resultType) => {
    const [filteredResults, setFilteredResults] = useState([]);

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
                const results = filterBySearchTerm(allItems, PROP_NAMES[resultType].nameProp, filterTerm);
                setFilteredResults(results); 
            }, 400);
        } else {
            setFilteredResults(allItems);
        }
        
        // Clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [filterTerm, allItems, resultType]);

    return { filteredResults };
}

export default useFilteredResults;