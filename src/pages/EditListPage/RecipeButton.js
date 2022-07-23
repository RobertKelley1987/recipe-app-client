import List from '../../services/List';
import './RecipeButton.scss';

const settings = {
    add: {
        // Add recipe to list, update state and provide success / error message
        fn: async (listId, recipe, setErrorMessage, setList, setSuccessMessage, userId) => {
            const newRecipe = { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } }
            const data = await List.addRecipe(listId, newRecipe, userId);
            if(data.err) {
                setErrorMessage('Unable to add recipe to list. Please try again later.');
            } else {
                setList(data.list);
                setSuccessMessage(`${recipe.strMeal} successfully added!`);
            }
            
        },
        text: 'Add To List'
    },
    remove: {
        // Remove recipe from list, update state and provide success / error message
        fn: async (listId, recipe, setErrorMessage, setList, setSuccessMessage, userId) => {
            const data = await List.deleteRecipe(listId, recipe.idMeal, userId)
            if(data.err) {
                setErrorMessage('Unable to remove recipe from list. Please try again later.');
            } else {
                setList(data.list);
                setSuccessMessage(`${recipe.strMeal} successfully removed.`);
            }
        },
        text: 'Remove From List'
    }
}

const RecipeButton = ({ list, recipe, setErrorMessage, setSuccessMessage, setList, userId }) => {
    // Determine whether button needs to add or remove the recipe
    const recipeIsOnList = list.recipes.findIndex(listRecipe => listRecipe.apiId === recipe.idMeal) !== -1;  
    let mode = recipeIsOnList ? 'remove' : 'add';

    const handleClick = () => settings[mode].fn(list._id, recipe, setErrorMessage, setList, setSuccessMessage, userId)

    // Return button component with appropriate text and click handler
    return (
        <button className="recipe-button" onClick={handleClick}>
            {settings[mode].text}
        </button>
    );
}

export default RecipeButton;