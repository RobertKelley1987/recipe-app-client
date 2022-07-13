import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { filterByFirstLetter, filterBySearchTerm } from '../util/filter-functions';
import Searchbar from '../Searchbar';
import './SearchWrapper.scss';

const SearchWrapper = props => {
    // categories matching search term
    const [categoryResults, setCategoryResults] = useState([]);
    // cuisnies matching search term
    const [cuisineResults, setCuisineResults] = useState([]);
    // ingredients matching search term
    const [ingredientResults, setIngredientResults] = useState([]);
    // lists matching search term
    const [listResults, setListResults] = useState([]);
    // track whether results are being filtered by ingredient, category or cuisine
    const [filterType, setFilterType] = useState('');
    // track specific item recipes are being filtered by, ex: chili powder
    const [filteredBy, setFilteredBy] = useState('');
    // recipes filtered by another result type, ex: American recipes, recipes with 
    // lettuce as an ingredient
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    // recipes matching search term
    const [recipeResults, setRecipeResults] = useState([]);
    // search term entered by user
    const [searchTerm, setSearchTerm] = useState('');
    // ref to search bar element as a point to scroll back to after a filter is applied
    const searchEl = useRef(null);

    const { allCategories, allCuisines, allIngredients, allLists, isSearchPage, list, setSearchIsVisible, updateList } = props;

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

    // Get results as user types in the search input
    useEffect (() => {
        const getResults = async searchTerm => {

            // get recipe results directly from api
            const getRecipeResults = async searchTerm => {
                // find recipe names that match
                const { data: recipes } = await axios.get(`https:///www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                let results = recipes.meals;

                // if term is one letter, only show recipes starting with that letter
                if(searchTerm.length === 1) {
                    results = filterByFirstLetter(results, searchTerm, 'strMeal');
                }

                setRecipeResults(results)
            }

            // find recipe names, ingredients, categories and cuisine types matching search term
            getRecipeResults (searchTerm);
            filterBySearchTerm (allIngredients, setIngredientResults, 'strIngredient', searchTerm);
            filterBySearchTerm (allCategories, setCategoryResults, 'strCategory', searchTerm);
            filterBySearchTerm (allCuisines, setCuisineResults, 'strArea', searchTerm);
        
            // if on search page, also get list results form app server
            isSearchPage && filterBySearchTerm (allLists, setListResults, 'name', searchTerm);
        }

        let timeoutId = setTimeout(() => {
            // test if user typed a search term
            if(searchTerm) {
                // clear any filtered results and fetch new results from api
                clearFilter();
                getResults(searchTerm);
            } else {
                // if search input is empty, clear results from current state
                clearAllResults();
            }
        }, 500);

        // clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [searchTerm, allCategories, allCuisines, allIngredients, allLists]);

    // Component passed to Search Wrapper to display search results
    const DisplayResults = props.displayResults;

    return (
        <div ref={searchEl} className="search-wrapper">
            <Searchbar 
                placeholder="search" 
                searchIsVisible={true} 
                searchTerm={searchTerm} 
                setSearchIsVisible={setSearchIsVisible} 
                setSearchTerm={setSearchTerm} 
            />
            <div className="search-wrapper__results">
                <DisplayResults 
                    categoryResults={categoryResults}
                    clearFilter={clearFilter}
                    cuisineResults={cuisineResults}                    
                    filterType={filterType}
                    filteredBy={filteredBy} 
                    filteredRecipes={filteredRecipes}
                    ingredientResults={ingredientResults}
                    list={list}
                    listResults={listResults}
                    recipeResults={recipeResults}
                    searchEl={searchEl} 
                    setFilter={setFilter} 
                    searchTerm={searchTerm} 
                    updateList={updateList}
                />
            </div>
        </div>
    )
}

export default SearchWrapper;