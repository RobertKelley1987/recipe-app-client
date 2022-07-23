import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recipe from '../services/Recipe';

const useRecipe = recipeId => {
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    // Fetch recipe data on initial load
    useEffect(() => {
        const getRecipe = async recipeId => {
            if(!recipeId) { return }

            // If user navigated to the random recipe page, fetch random recipe.
            // Otherwise get specific recipe using recipe id provided. 
            const data = recipeId === 'random' ? await Recipe.getRandom() : await Recipe.getOne(recipeId); 
            
            // If user selected a random recipe, navigate to correct page using id from api,
            // so they can return to the same recipe using the back button
            if(recipeId === 'random') {
                navigate(`/recipes/${data.meals[0].idMeal}`, { replace: true });
            }

            setRecipe(data.meals[0]);
        }

        getRecipe(recipeId);

    }, [recipeId, navigate]); 

    return { recipe }
}

export default useRecipe;