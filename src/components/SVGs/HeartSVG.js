import axios from 'axios';

const configClassNames = (className, favorites, recipe) => {
    // Test if recipe is in user's favorites list
    let recipeIsFavorite = favorites && favorites.findIndex(fav => fav.apiId === recipe.idMeal) !== -1;
    // If recipe is on that list, append class name to fill heart svg
    return !recipeIsFavorite ? className : `${className} ${className}--fav`; 
}

const toggleFavoriteStatus = async (recipe, updateFavorites, userId) => {
    // Add or remove recipe from favorites depending on current favorite status 
    const { data } = await axios.post(`/users/${userId}/favorites`, { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } });
    // Update app state to reflect change
    updateFavorites(data.favorites); 
}

const HeartSVG = ({ className, favorites, recipe, updateFavorites, userId }) => {
    console.log(favorites);
    return recipe && (
        <svg 
            className={configClassNames(className, favorites, recipe)} 
            fill="none" 
            onClick={() => toggleFavoriteStatus(recipe, updateFavorites, userId)} 
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