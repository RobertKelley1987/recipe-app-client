import Favorite from '../../services/Favorite';
import { capitalize } from '../../util/formatting';
import { configClassNames } from '../../util/config-classnames';

const toggleFavoriteStatus = async (recipe, recipeIsFavorite, setErrorMessage, setSuccessMessage, updateFavorites, userId) => {
    // Add or remove recipe from favorites depending on current favorite status 
    const favRecipe = { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } }
    const data = await Favorite.toggle(favRecipe, userId);
    // Test for server error
    if(data.err) {
        // Display error message
        setErrorMessage('Failed to change favorite status for recipe.');
    } else {
        // Update app state to reflect change
        updateFavorites(data.favorites); 
        // Display appropriate success message
        let successMessage = recipeIsFavorite ? `${capitalize(recipe.strMeal)} is removed from favorites.` : `${capitalize(recipe.strMeal)} is added to favorites!`;
        setSuccessMessage(successMessage);
    }
}

const HeartSVG = ({ className, favorites, recipe, setErrorMessage, setSuccessMessage, updateFavorites, userId }) => {
    // Test if recipe is in user's favorites list
    let recipeIsFavorite = favorites && favorites.findIndex(fav => fav.apiId === recipe.idMeal) !== -1;

    return recipe && (
        <svg 
            className={configClassNames(className, recipeIsFavorite, 'fav')} 
            fill="none" 
            onClick={() => toggleFavoriteStatus(recipe, recipeIsFavorite, setErrorMessage, setSuccessMessage, updateFavorites, userId)} 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
    )
}

export default HeartSVG;