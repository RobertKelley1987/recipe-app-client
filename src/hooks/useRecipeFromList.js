import { useEffect, useState } from 'react';
import Recipe from '../services/Recipe';
import { hasRecipes } from '../util/has-recipes';

const useRecipeFromList = list => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async list => {
            if(hasRecipes(list)) {
                const data = await Recipe.getOne(list.recipes[0].apiId)
                data.meals && setRecipe(data.meals[0]);
            } 
        }

        getRecipe(list);
    }, [list]);

    return { recipe };
}

export default useRecipeFromList;