import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWithFilter from './PageWithFilter';
import RecipeSquares from '../components/RecipeSquares';

const RecipesPage = props => {
    const [recipes, setRecipes] = useState([]);
    const { name } = useParams();
    const { fetchFn, filterType } = props;

    // Get recipes from api based on url provided on initial render
    useEffect(() => {
        const getRecipes = async () => {
            // Fetch recipes using fetch function passed as prop
            const data = await fetchFn(name);
            setRecipes(data.meals);
        }

        getRecipes();
    }, [fetchFn, filterType, name]);

    // Pass recipes to display page with filter feature
    return <PageWithFilter {...props} allItems={recipes} listComponent={RecipeSquares} resultType='recipe' />
}

export default RecipesPage;