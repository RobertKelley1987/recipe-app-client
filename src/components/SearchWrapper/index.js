import { useCallback, useEffect, useRef, useState } from 'react';
import Recipe from '../../services/Recipe';
import { filterByFirstLetter, filterBySearchTerm } from '../../util/filter-functions';
import LoadingWrapper from '../LoadingWrapper';
import Searchbar from '../Searchbar';
import './SearchWrapper.scss';

const SearchWrapper = props => {
    // Categories matching search term
    const [categoryResults, setCategoryResults] = useState([]);
    // Cuisnies matching search term
    const [cuisineResults, setCuisineResults] = useState([]);
    // Ingredients matching search term
    const [ingredientResults, setIngredientResults] = useState([]);
    // Track whether component is waiting for api results
    const [isLoading, setIsLoading] = useState(false);
    // Lists matching search term
    const [listResults, setListResults] = useState([]);
    // Track whether recipe results are being filtered by ingredient, category or cuisine
    const [filterType, setFilterType] = useState('');
    // Track which item recipes are being filtered by, ex: chili powder
    const [filteredBy, setFilteredBy] = useState('');
    // Recipes filtered by another result type, ex: American recipes, recipes with 
    // lettuce as an ingredient
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    // All recipes matching search term
    const [recipeResults, setRecipeResults] = useState([]);
    // Track whether one type of result is displayed, ex: only cuisines, only categories, only recipes
    const [resultTypeVisible, setResultTypeVisible] = useState('');
    // Search term entered by user
    const [searchTerm, setSearchTerm] = useState('');
    // Ref to search bar element as a point to scroll back to after a filter is applied
    const searchEl = useRef(null);

    const { allCategories, allCuisines, allIngredients, allLists, isSearchPage, list, setSearchIsVisible, updateList } = props;

    const updateSearchTerm = useCallback(searchTerm => setSearchTerm(searchTerm), []);

    // HELPER FUNCTIONS
    const clearAllResults = () => {
        setRecipeResults([]);
        setIngredientResults([]);
        setCategoryResults([]);
        setCuisineResults([]);
    }

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

    // Get results as user types in search input
    useEffect(() => {
        // If there is a search term, set loading status to true
        searchTerm && setIsLoading(true);

        const getResults = async searchTerm => {
            // Get recipe results from api
            const getRecipeResults = async searchTerm => {
                // Find recipe names that match search term
                const data = await Recipe.findAll(searchTerm);
                let results = data.meals;

                // If term is one letter, only show recipes starting with that letter
                if(searchTerm.length === 1) {
                    results = filterByFirstLetter(results, searchTerm, 'strMeal');
                }

                setRecipeResults(results)
            }

            // find recipe names, ingredients, categories and cuisine types matching search term
            await getRecipeResults(searchTerm);
            filterBySearchTerm(allIngredients, setIngredientResults, 'strIngredient', searchTerm);
            filterBySearchTerm(allCategories, setCategoryResults, 'strCategory', searchTerm);
            filterBySearchTerm(allCuisines, setCuisineResults, 'strArea', searchTerm);
        
            // if on search page, also get list results form app server
            isSearchPage && filterBySearchTerm(allLists, setListResults, 'name', searchTerm);
        }

        let timeoutId = setTimeout(async () => {
            // test if user typed a search term
            if(searchTerm) {
                // clear any filtered results and fetch new results from api
                clearFilter();
                await getResults(searchTerm)
            } else {
                // if search input is empty, clear results from current state
                clearAllResults();  
            }
            setIsLoading(false);
        }, 500);

        // clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [allCategories, allCuisines, allIngredients, allLists, isSearchPage, searchTerm]);

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