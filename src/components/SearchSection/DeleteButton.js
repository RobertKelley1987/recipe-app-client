import axios from 'axios';
import './Button.scss';

const DeleteButton = ({ listId, recipeId, setList }) => {
    const removeFromList = async recipeId => {
        const { data } = await axios.delete(`/lists/${listId}/recipes/${recipeId}`);
        setList(data.list);
    }

    return <button className="button" onClick={() => removeFromList(recipeId)}>Remove From List</button>;;
}

export default DeleteButton;