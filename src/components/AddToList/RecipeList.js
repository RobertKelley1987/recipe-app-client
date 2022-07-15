import { useNavigate } from 'react-router-dom';
import List from '../../services/List';
import './RecipeList.scss';

const RecipeList = ({ list, recipe, setErrorMessage, setSuccessMessage, userId }) => {
    const navigate = useNavigate();

    // New recipe to be added to database
    const recipeToAdd = { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } }

    const handleClick = async (listId, recipe, userId) => {
        const data = await List.addRecipe(listId, recipe, userId)
        // Test for server error
        if(data.err) {
            setErrorMessage(data.err.message);
        } else {
            setSuccessMessage(`Recipe added!`);
            navigate(-1);
        }
    }

    return <li className="recipe-list" onClick={() => handleClick(list._id, recipeToAdd, userId)}>{list.name}</li>
}

export default RecipeList;