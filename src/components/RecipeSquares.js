import Square from './Square/Square';

const RecipeSquares = ({ recipes }) => {
    return recipes.map(recipe => {
        // if one theses 2 id props exists, use that number. 
        // Otherwise recipe is likely a string representing the id.
        let objId = recipe.idMeal || recipe.apiId;
        let recipeId = objId ? objId : recipe;

        console.log(recipeId);

        return <Square 
                    key={recipeId} 
                    linkURL={`/recipes/${recipeId}`} 
                    searchURL={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`}
                    squareType='recipe'
                />
    })
}

export default RecipeSquares;