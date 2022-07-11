import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomRecipe = () => {
    const [recipeId, setRecipeId] = useState(null);
    const navigate = useNavigate()

    // Get random recipe id from api pn inital render
    useEffect(() => {
        const getRecipe = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
            setRecipeId(data.meals[0].idMeal);
        }

        getRecipe();
    });

    // Redirect to recipe page using recipe id
    if(recipeId) {
        navigate(`/recipes/${recipeId}`, { replace: false });
    }
    
}

export default RandomRecipe;