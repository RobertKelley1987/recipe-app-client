import { useEffect, useState } from 'react';
import { filterByFirstLetter, filterBySearchTerm } from '../util/filter-functions';
import Recipe from '../services/Recipe';

const useTypingSearchAll = (categories, cuisines, ingredients, lists, searchTerm, setLoadingStatus) => {
    const [categoryResults, setCategoryResults] = useState([]);
    const [cuisineResults, setCuisineResults] = useState([]);
    const [ingredientResults, setIngredientResults] = useState([]);
    const [listResults, setListResults] = useState([]);
    const [recipeResults, setRecipeResults] = useState([]);
    
    // Get results as user types in search input
    useEffect(() => {
        // If there is a search term, set loading status to true
        searchTerm && setLoadingStatus(true);

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

                return results;
            }

            // find recipe names, ingredients, categories and cuisine types matching search term
            const filteredRecipes = await getRecipeResults(searchTerm);
            setRecipeResults(filteredRecipes);
            const filteredCategories = filterBySearchTerm(categories, 'strCategory', searchTerm);
            setCategoryResults(filteredCategories);
            const filteredCuisines = filterBySearchTerm(cuisines, 'strArea', searchTerm);
            setCuisineResults(filteredCuisines);
            const filteredIngredients = filterBySearchTerm(ingredients, 'strIngredient', searchTerm);
            setIngredientResults(filteredIngredients);
            const filteredLists = filterBySearchTerm(lists, 'name', searchTerm);
            setListResults(filteredLists);
        }

        let timeoutId = setTimeout(async () => {
            // test if user typed a search term
            if(searchTerm) {
                await getResults(searchTerm);
            } else {
                // if search input is empty, clear results from current state
                setRecipeResults([]);
                setIngredientResults([]);
                setCategoryResults([]);
                setCuisineResults([]); 
                setListResults([]); 
            }
            setLoadingStatus(false);
        }, 500);

        // clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [categories, cuisines, ingredients, lists, searchTerm]);

    return { categoryResults, cuisineResults, ingredientResults, listResults, recipeResults };
}

export default useTypingSearchAll;