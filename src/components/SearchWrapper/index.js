import { useCallback, useRef, useState } from 'react';
import useTypingSearchAll from '../../hooks/useTypingSearchAll';
import LoadingWrapper from '../LoadingWrapper';
import Searchbar from '../Searchbar';

const SearchWrapper = props => {
    // Track whether component is waiting for api results
    const [isLoading, setIsLoading] = useState(false);
    // Track whether recipe results are being filtered by ingredient, category or cuisine
    const [filterType, setFilterType] = useState('');
    // Track which item recipes are being filtered by, ex: chili powder
    const [filteredBy, setFilteredBy] = useState('');
    // Recipes filtered by another result type, ex: American recipes, recipes with 
    // lettuce as an ingredient
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    // Track whether one type of result is displayed, ex: only cuisines, only categories, only recipes
    const [resultTypeVisible, setResultTypeVisible] = useState('');
    // Search term entered by user
    const [searchTerm, setSearchTerm] = useState('');
    // Ref to search bar element as a point to scroll back to after a filter is applied
    const searchEl = useRef(null);
    const { allCategories, allCuisines, allIngredients, allLists, list, setSearchIsVisible, updateList } = props;
    const { categoryResults, 
            cuisineResults, 
            ingredientResults, 
            listResults, 
            recipeResults 
    } = useTypingSearchAll(allCategories, allCuisines, allIngredients, allLists, searchTerm, setIsLoading);

    const updateSearchTerm = useCallback(searchTerm => setSearchTerm(searchTerm), []);

    const clearFilter = () => {
        setFilteredBy('');
        setFilteredRecipes([]);
        setFilterType('');
    }

    const setFilter = (filteredBy, filteredRecipes, filterType) => {
        setFilteredBy(filteredBy);
        setFilteredRecipes(filteredRecipes);
        setFilterType(filterType);
    }

    // Component passed to SearchWrapper to display search results
    const DisplayResults = props.displayResults;
    // Component passed to SearchWrapper to filter results by type (search page only)  
    const FilterOptions = props.filterOptions;
    
    return (
        <div ref={searchEl} className="search-wrapper">
            <Searchbar 
                placeholder="search for recipes" 
                searchIsVisible={true} 
                updateSearchTerm={updateSearchTerm} 
                setSearchIsVisible={setSearchIsVisible} 
                setSearchTerm={setSearchTerm} 
            />
            {FilterOptions && <FilterOptions resultTypeVisible={resultTypeVisible} setResultTypeVisible={setResultTypeVisible} />}
            <div className="search-wrapper__results"> 
                <LoadingWrapper isLoading={isLoading}>
                    <DisplayResults 
                        {...props}
                        categoryResults={categoryResults}
                        clearFilter={clearFilter}
                        cuisineResults={cuisineResults}                    
                        filterType={filterType}
                        filteredBy={filteredBy} 
                        filteredRecipes={filteredRecipes}
                        ingredientResults={ingredientResults}
                        isLoading={isLoading}
                        list={list}
                        listResults={listResults}
                        recipeResults={recipeResults}
                        resultTypeVisible={resultTypeVisible}
                        searchEl={searchEl} 
                        setFilter={setFilter} 
                        searchTerm={searchTerm} 
                        updateList={updateList}
                    />
                </LoadingWrapper>
            </div>
        </div>
    )
}

export default SearchWrapper;