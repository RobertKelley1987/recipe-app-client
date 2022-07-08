import Square from './Square';

const RecipeSquares = ({ recipes }) => {
    return recipes.map(recipe => {
        // if the list is from the database, use id prop. 
        // Otherwise recipe is a string representing the id. 
        let recipeId = recipe.idMeal ? recipe.idMeal : recipe;
        
        return <Square 
                    key={recipeId} 
                    linkURL={`/recipes/${recipeId}`} 
                    searchURL={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`}
                    squareType='recipe'
                />
    })
}

export default RecipeSquares;