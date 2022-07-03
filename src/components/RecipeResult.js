import axios from 'axios';
import './RecipeResult.scss'; 

const RecipeResult = ({ listId, recipe, list, setList }) => {
    const addToList = async recipeId => {
        const { data } = await axios.post(`/lists/${listId}/recipes`, { recipeId: recipeId });
        setList(data.list);
    }

    return (
        <div className="recipe-result" key={recipe.idMeal}>
            <div className="recipe-result__wrapper">
                <img className="recipe-result__img" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <div>
                    <h3 className="recipe-result__name">{recipe.strMeal}</h3>
                    <p className="recipe-result__type">Recipe</p>
                </div>
            </div>
            <button className="recipe-result__button" onClick={() => addToList(recipe.idMeal)}>Add</button>
        </div>
    )
}

export default RecipeResult;