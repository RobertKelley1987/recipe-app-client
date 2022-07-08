import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import ResultsSection from './ResultsSection';
import CloseSVG from '../SVGs/CloseSVG';
import SearchSVG from '../SVGs/SearchSVG';
import './SearchSection.scss';

const SearchSection = ({ list, listId, setSearchIsVisible, updateList }) => {
    const [allIngredients, setAllIngredients] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    const [categoryResults, setCategoryResults] = useState([]);
    const [cuisineResults, setCuisineResults] = useState([]);
    const [ingredientResults, setIngredientResults] = useState([]);
    // track whether results are being filtered by ingredient, category or cuisine
    const [filterType, setFilterType] = useState('');
    // track specific item recipes are being filtered by, ex: chili powder
    const [filteredBy, setFilteredBy] = useState('')
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [recipeResults, setRecipeResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect (() => {
        // get a complete list of an item type from api and store in app's state
        const getAllItems = async (apiSlug, propName, setAllItems) => { 
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/${apiSlug}`); 
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
                setRecipeResults(recipes.meals);
            }

            // get results from a list stored in app's state, then update state for that result type
            const getStoredResults = (allItems, setItems, nameProp, searchTerm) => {
                const results = allItems.filter(item => {
                    if(item[nameProp].toLowerCase().includes(searchTerm.toLowerCase())) {
                        return item;
                    }
                    return false;
                });
                setItems(results);
            }

            // find recipe names, ingredients, categories and cuisine types matching search term
            getRecipeResults (searchTerm);
            getStoredResults (allIngredients, setIngredientResults, 'strIngredient', searchTerm);
            getStoredResults (allCategories, setCategoryResults, 'strCategory', searchTerm);
            getStoredResults (allCuisines, setCuisineResults, 'strArea', searchTerm);

        }

        const clearAllResults = () => {
            setRecipeResults([]);
            setIngredientResults([]);
            setCategoryResults([]);
            setCuisineResults([]);
        }

        const clearFilter = () => {
            setFilterType('');
            setFilteredBy('');
            setFilteredRecipes([])
        }

        let timeoutId = setTimeout(() => {
            // test if user typed a search term
            if(searchTerm) {
                // clear any filtered results and fetch new results from api
                clearFilter();
                getResults(searchTerm);
            } else {
                // if search input is empty, clear results from app state
                clearAllResults();
            }
        }, 500);

        // clear timeout each time component re-renders
        return () => clearTimeout(timeoutId);
    }, [searchTerm, allCategories, allCuisines, allIngredients]);

    const renderSearchResults = filterType => {
        if(!filterType) {
            return (
                <Fragment>
                    {/* Recipe results */}
                    <ResultsSection 
                        filterType={filterType}
                        filteredBy={filteredBy} 
                        setFilterType={setFilterType} 
                        setFilteredBy={setFilteredBy}
                        setFilteredRecipes={setFilteredRecipes}
                        list={list}
                        listId={listId} 
                        results={recipeResults} 
                        resultType='recipe' 
                        searchTerm={searchTerm} 
                        updateList={updateList}
                    />
                    {/* Ingredient results */}
                    <ResultsSection 
                        results={ingredientResults} 
                        resultType='ingredient' 
                        setFilterType={setFilterType} 
                        setFilteredBy={setFilteredBy}
                        setFilteredRecipes={setFilteredRecipes} 
                    />
                    <ResultsSection 
                        results={categoryResults} 
                        resultType='category' 
                        setFilterType={setFilterType} 
                        setFilteredBy={setFilteredBy}
                        setFilteredRecipes={setFilteredRecipes}
                    />
                    <ResultsSection 
                        results={cuisineResults} 
                        resultType='cuisine'
                        setFilterType={setFilterType} 
                        setFilteredBy={setFilteredBy}
                        setFilteredRecipes={setFilteredRecipes} 
                    />
                </Fragment>
            );
        } else {
            return ( 
                <ResultsSection 
                    filterType={filterType}
                    filteredBy={filteredBy} 
                    list={list}
                    listId={listId} 
                    results={filteredRecipes} 
                    resultType='recipe' 
                    searchTerm={searchTerm} 
                    setFilteredBy={setFilteredBy}
                    setFilterType={setFilterType} 
                    setFilteredRecipes={setFilteredRecipes} 
                    updateList={updateList} 
                />
            )
        }
    }

    return (
        <section className="search-section">
            <div className="search-section__searchbar-wrapper">
                <div className="search-section__searchbar">
                    <SearchSVG className="search-section__svg"/>
                    <input className="search-section__input" placeholder="search" onChange={e => setSearchTerm(e.target.value)} type="text" value={searchTerm}/>
                </div>
                <CloseSVG className="search-section__svg" handleClick={() => setSearchIsVisible(false)} />
            </div>
            <div className="search-section__results">
                {renderSearchResults(filterType)}
            </div>
        </section>
    )


}

export default SearchSection;