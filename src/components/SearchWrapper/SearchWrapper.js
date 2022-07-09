import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { filterByFirstLetter, filterBySearchTerm } from '../util/filter-functions';
import CloseSVG from '../SVGs/CloseSVG';
import ListSearchResults from './ListSearchResults';
import SearchPageResults from './SearchPageResults';
import SearchSVG from '../SVGs/SearchSVG';
import './SearchWrapper.scss';

const SearchSection = ({ allLists, isSearchPage, list, setSearchIsVisible, updateList }) => {
    // list of all categories from api
    const [allCategories, setAllCategories] = useState([]);
    // list of all cuisines from api
    const [allCuisines, setAllCuisines] = useState([]);
    // list of all ingredients from api
    const [allIngredients, setAllIngredients] = useState([]);
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

    useEffect (() => {
        // get a complete list of an item type from api and store in app's state
        const getAllItems = async (urlSlug, propName, setAllItems) => { 
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/${urlSlug}`); 
            setAllItems(data[propName]);
        }

        // get all ingredients, categories and cuisine types and save to app state
        getAllItems ('list.php?i=list', 'meals', setAllIngredients);
        getAllItems ('categories.php', 'categories', setAllCategories);
        getAllItems ('list.php?a=list', 'meals', setAllCuisines);
    }, []);

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

                console.log(results);

                setRecipeResults(results)
            }

            // find recipe names, ingredients, categories and cuisine types matching search term
            getRecipeResults (searchTerm);
            filterBySearchTerm (allIngredients, setIngredientResults, 'strIngredient', searchTerm);
            filterBySearchTerm (allCategories, setCategoryResults, 'strCategory', searchTerm);
            filterBySearchTerm (allCuisines, setCuisineResults, 'strArea', searchTerm);
            
            // if on search page, get list results as well
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

    const renderSearchResults = isSearchPage => {
        if(isSearchPage) {
            return <SearchPageResults 
                        categoryResults={categoryResults}
                        cuisineResults={cuisineResults} 
                        listResults={listResults}
                        recipeResults={recipeResults}
                    />
        } else {
            return <ListSearchResults 
                        categoryResults={categoryResults}
                        clearFilter={clearFilter}
                        cuisineResults={cuisineResults}                    
                        filterType={filterType}
                        filteredBy={filteredBy} 
                        filteredRecipes={filteredRecipes}
                        ingredientResults={ingredientResults}
                        list={list}
                        recipeResults={recipeResults}
                        searchEl={searchEl} 
                        setFilter={setFilter} 
                        searchTerm={searchTerm} 
                        updateList={updateList}
                    />
        }
    }

    return (
        <div className="search-wrapper">
            <div className="search-wrapper__searchbar-wrapper">
                <div ref={searchEl} className="search-wrapper__searchbar">
                    <SearchSVG className="search-wrapper__svg"/>
                    <input className="search-wrapper__input" placeholder="search" onChange={e => setSearchTerm(e.target.value)} type="text" value={searchTerm}/>
                </div>
                <CloseSVG className="search-wrapper__svg" handleClick={() => setSearchIsVisible(false)} />
            </div>
            <div className="search-wrapper__results">
                {renderSearchResults(isSearchPage)}
            </div>
        </div>
    )
}

export default SearchSection;