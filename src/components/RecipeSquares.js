import RecipeSquare from './RecipeSquare';

const RecipeSquares = ({ recipes }) => {
    return recipes.map(recipeId => <RecipeSquare key={recipeId} recipeId={recipeId} />)
}

export default RecipeSquares;