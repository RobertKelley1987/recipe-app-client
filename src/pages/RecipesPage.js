import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWithFilter from './PageWithFilter';
import RecipeSquares from '../components/RecipeSquares';

const RecipesPage = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const { name } = useParams();
    const { fetchFn, filterType } = props;

    // Get recipes from api based on url provided on initial render
    useEffect(() => {
        const getRecipes = async () => {
            setIsLoading(true);
            // Fetch recipes using fetch function passed as prop
            const data = await fetchFn(name);
            setRecipes(data.meals);
            setIsLoading(false);
        }

        getRecipes();
    }, [fetchFn, filterType, name]);

    // Pass recipes to display page with filter feature
    return <PageWithFilter {...props} allItems={recipes} isLoading={isLoading} listComponent={RecipeSquares} resultType='recipe' />
}

export default RecipesPage;