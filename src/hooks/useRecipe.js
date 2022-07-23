import { useEffect, useState } from 'react';
import Recipe from '../services/Recipe';

const useRecipe = recipeId => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async recipeId => {
            const data = await Recipe.getOne(recipeId);
            data.meals && setRecipe(data.meals[0]);
        }

        getRecipe(recipeId);
    }, [recipeId]);

    return { recipe }
}

export default useRecipe;