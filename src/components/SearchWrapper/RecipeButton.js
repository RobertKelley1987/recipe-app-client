import List from '../../services/List';
import './RecipeButton.scss';

const settings = {
    add: {
        // Add button to list and update state
        fn: async (listId, recipe, updateList, userId) => {
            const newRecipe = { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } }
            const data = await List.addRecipe(listId, newRecipe, userId);
            updateList(data.list);
        },
        text: 'Add To List'
    },
    remove: {
        // Remove button from list and update state
        fn: async (listId, recipe, updateList, userId) => {
            const data = await List.deleteRecipe(listId, recipe.idMeal, userId)
            updateList(data.list);
        },
        text: 'Remove From List'
    }
}

const RecipeButton = ({ list, recipe, updateList, userId }) => {
    // Determine whether button needs to add or remove the recipe
    let mode = list.recipes.findIndex(listRecipe => listRecipe.apiId === recipe.idMeal) === -1 ? 'add' : 'remove';

    // Return button component with appropriate text and click handler
    return (
        <button className="recipe-button" onClick={() => settings[mode].fn(list._id, recipe, updateList, userId)}>
            {settings[mode].text}
        </button>
    );
}

export default RecipeButton;