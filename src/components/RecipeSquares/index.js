import RecipeSquare from './RecipeSquare';
import './RecipeSquares.scss';

const RecipeSquares = props => {
    const { items: recipes } = props;

    return (
        <div className="recipe-squares">
            {recipes.map(recipe => {
                // Use either id from api or id from app server as recipe id
                let recipeId = recipe.apiId || recipe.idMeal;
                return <RecipeSquare 
                            {...props}
                            key={recipe.apiId || recipe.idMeal} 
                            searchURL={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`}
                        />
            })}
        </div>
    );
}

export default RecipeSquares;