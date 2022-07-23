import { useEffect, useState } from 'react';
import { filterBySearchTerm } from '../util/filter-functions';

const useTypingFilter = (recipes, searchTerm, setLoadingStatus) => {
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    // Update results as user types in filter input
    useEffect(() => {
        // Update loading state
        setLoadingStatus(true);
        let timeoutId = setTimeout(() => {
            // If filter input is not blank, filter results. Otherwise clear results.
            const results = searchTerm ? filterBySearchTerm(recipes, 'name', searchTerm) : [];
            setFilteredRecipes(results);
            // Update loading state
            setLoadingStatus(false);
        }, 400);

        // Clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [searchTerm, recipes, setLoadingStatus]);

    return { filteredRecipes };
}

export default useTypingFilter;