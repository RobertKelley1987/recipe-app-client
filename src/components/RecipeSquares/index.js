import RecipeSquare from './RecipeSquare';
import './RecipeSquares.scss';

const RecipeSquares = props => {
    const { items: recipes } = props;

    return (
        <div className="recipe-squares">
            {recipes.map(recipe => {
                // Use either id from api or id from app server as recipe id
                let recipeId = recipe.apiId || recipe.idMeal;
                return <RecipeSquare {...props} key={recipe.apiId || recipe.idMeal} recipeId={recipeId} />
            })}
        </div>
    );
}

export default RecipeSquares;