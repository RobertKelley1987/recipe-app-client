import Square from './Square/Square';
import './Squares.scss';

const RecipeSquares = ({ items, resultType }) => {
    // Test if items passed to component are recipes, not categories, cuisines or ingredients
    if(!items[0].idMeal && !items[0].apiId) {
        // If items are not recipes, return nothing
        return null;
    }
       
    // Otherwise return grid of recipe squares
    return (
        <div className="squares">
            {items.map(recipe => {

                console.log(recipe);

            // if one theses 2 id props exists, use that id number. 
            // Otherwise recipe is a string representing the id.
            let recipeId = recipe.idMeal || recipe.apiId;

            return <Square 
                        key={recipeId} 
                        linkURL={`/recipes/${recipeId}`} 
                        searchURL={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`}
                        squareType='recipe'
                    />
            })}
        </div> 
    );
}

export default RecipeSquares;