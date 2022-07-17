import { useParams, useNavigate } from 'react-router-dom';
import List from '../services/List';
import Modal from '../components/Modal';
import './DeleteRecipe.scss';

const deleteRecipe = async (listId, recipeId, navigate, setList, userId) => {
    const data = await List.deleteRecipe(listId, recipeId, userId);
    setList(data.list);
    navigate(-1);
}

const DeleteRecipe = ({ setList, userId }) => {
    const { listId, recipeId } = useParams();
    const navigate = useNavigate();

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-recipe">
                <p>Delete recipe from list?</p>
                <button onClick={() => deleteRecipe(listId, recipeId, navigate, setList, userId)} className="delete-recipe__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-recipe__button">Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteRecipe;