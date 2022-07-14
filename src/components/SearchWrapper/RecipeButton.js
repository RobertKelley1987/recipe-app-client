import axios from 'axios';
import './RecipeButton.scss';

const settings = {
    add: {
        // Add button to list and update state
        fn: async (listId, recipe, updateList) => {
            const { data } = await axios.post(`/lists/${listId}/recipes`, { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } });
            updateList(data.list);
        },
        text: 'Add To List'
    },
    remove: {
        // Remove button from list and update state
        fn: async (listId, recipe, updateList) => {
            const { data } = await axios.delete(`/lists/${listId}/recipes/${recipe.idMeal}`);
            updateList(data.list);
        },
        text: 'Remove From List'
    }
}

const RecipeButton = ({ list, recipe, updateList }) => {
    // Determine whether button needs to add or remove the recipe
    let mode = list.recipes.findIndex(listRecipe => listRecipe.apiId === recipe.idMeal) === -1 ? 'add' : 'remove';

    // Return button component with appropriate text and click handler
    return (
        <button className="recipe-button" onClick={() => settings[mode].fn(list._id, recipe, updateList)}>
            {settings[mode].text}
        </button>
    );
}

export default RecipeButton;