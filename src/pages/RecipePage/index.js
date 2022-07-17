import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IngredientsSection from './IngredientsSection';
import PrepSection from './PrepSection';
import Recipe from '../../services/Recipe';
import RecipeCardXL from '../../components/RecipeCardXL'; 
import './RecipePage.scss';

const RecipePage = props => {
    const [recipe, setRecipe] = useState(null);
    const { recipeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    return recipe && (
        <main className="recipe-page">
            <RecipeCardXL {...props} isHeader={true} recipe={recipe} />
            <IngredientsSection recipe={recipe} />
            <PrepSection recipe={recipe} />
        </main>
    )
}

export default RecipePage;