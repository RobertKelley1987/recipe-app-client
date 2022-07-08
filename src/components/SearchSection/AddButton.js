import axios from 'axios';
import './Button.scss';

const AddButton = ({ recipeId, listId, updateList }) => {
    const addToList = async recipeId => {
        const { data } = await axios.post(`/lists/${listId}/recipes`, { recipeId: recipeId });
        updateList(data.list);
    }

    return <button className="button" onClick={() => addToList(recipeId)}>Add To List</button>;;
}

export default AddButton;