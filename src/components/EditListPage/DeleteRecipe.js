import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../Modal';

const deleteRecipe = async (listId, recipeId, navigate, setList) => {
    const { data } = await axios.delete(`/lists/${listId}/recipes/${recipeId}`);
    setList(data.list);
    navigate(`/lists/${listId}`);
}

const DeleteRecipe = ({ setList }) => {
    const { listId, recipeId } = useParams();
    const navigate = useNavigate();

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-recipe">
                <p>Delete recipe from list?</p>
                <button onClick={() => deleteRecipe(listId, recipeId, navigate, setList)} className="delete-recipe__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-recipe__button">Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteRecipe;