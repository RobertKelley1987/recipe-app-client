import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFilteredRecipes from '../hooks/useFilteredRecipes';
import PageWithFilter from './PageWithFilter';
import RecipeSquares from '../components/RecipeSquares';

const RecipesPage = props => {
    const [isLoading, setIsLoading] = useState(false); // track whether api is fetching data
    const { name } = useParams(); // name of category, cuisine or ingredient to filter by
    const { fetchFn } = props; // a function from services to fetch filtered recipes
    const { recipes } = useFilteredRecipes(name, fetchFn, setIsLoading)

    // Pass recipes to display page with filter feature
    return <PageWithFilter {...props} allItems={recipes} isLoading={isLoading} listComponent={RecipeSquares} resultType='recipe' />
}

export default RecipesPage;