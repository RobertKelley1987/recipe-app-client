import axios from 'axios';
import { useEffect, useState } from 'react';
import IngredientResult from './IngredientResult';
import RecipeResult from './RecipeResult';
import CloseSVG from './SVGs/CloseSVG';
import SearchSVG from './SVGs/SearchSVG';
import './SearchSection.scss';

const SearchSection = ({ list, listId, setList, setSearchIsVisible }) => {
    const [allIngredients, setAllIngredients] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [recipeResults, setRecipeResults] = useState([]);
    const [cuisineResults, setCuisineResults] = useState([]);
    const [ingredientResults, setIngredientResults] = useState([]);
    const [categoryResults, setCategoryResults] = useState([]);

    useEffect(() => {
        const getAllIngredients = async () => { 
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list'); 
            setAllIngredients(data.meals);
        }

        const getAllCategories = async () => { 
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php'); 
            setAllCategories(data.categories);
        }

        const getAllCuisines = async () => { 
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list'); 
            setAllCuisines(data.meals);
        }
            
        getAllIngredients();
        getAllCategories();
        getAllCuisines();
    }, []);

    useEffect(() => {
        const getResults = async searchTerm => {

            // find recipe names that match
            const { data: recipes } = await axios.get(`https:///www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            setRecipeResults(recipes.meals);

            // find ingredient names that match
            const matchingIngredients = allIngredients.filter(ingredient => {
                if(ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return ingredient;
                }
            });
            setIngredientResults(matchingIngredients);

            // find category names that match
            const matchingCategories = allCategories.filter(category => {
                if(category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return category;
                }
            });
            setCategoryResults(matchingCategories);

            // find cuisine results that match
            const matchingCuisines = allCuisines.filter(cuisine => {
                if(cuisine.strArea.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cuisine;
                }
            }); 
            setCuisineResults(matchingCuisines);

        }

        let timeoutId = setTimeout(() => {
            if(searchTerm) {
                getResults(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

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
            <h2>recipes</h2>
            {recipeResults && recipeResults.map(recipe => <RecipeResult key={recipe.idMeal} listId={listId} recipe={recipe} setList={setList} />)}
            <h2>ingredients</h2>
            {ingredientResults && ingredientResults.map(ingredient => <IngredientResult ingredient={ingredient} />)}
            <h2>categories</h2>
            <h2>cuisines</h2>
        </div>
    </section>
    )


}

export default SearchSection;