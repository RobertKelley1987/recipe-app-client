import Square from './Square/Square';
import './Squares.scss';

const RecipeSquares = ({ recipes }) => {
    return (
        <div className="squares">
            {recipes.map(recipe => {

            // if one theses 2 id props exists, use that id number. 
            // Otherwise recipe is a string representing the id.
            let objId = recipe.idMeal || recipe.apiId;
            let recipeId = objId ? objId : recipe;

            return <Square 
                        key={recipeId} 
                        linkURL={`/recipes/${recipeId}`} 
                        searchURL={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`}
                        squareType='recipe'
                    />
            })}
        </div> 
    )
}

export default RecipeSquares;