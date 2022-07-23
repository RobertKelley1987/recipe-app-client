import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipe from '../hooks/useRecipe';
import List from '../services/List';
import ErrorMessage from './ErrorMessage';
import Modal from '../components/Modal';
import './DeleteRecipe.scss';

const deleteRecipe = async (getList, listId, recipeId, navigate, setErrorMessage, userId) => {
    const data = await List.deleteRecipe(listId, recipeId, userId);
    if(data.err) {
        setErrorMessage('Unable to delete list. Please try again.')
    } else {
        await getList(listId)
        navigate(-1);
    }
}

const DeleteRecipe = ({ getList, userId }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const { listId, recipeId } = useParams();
    const { recipe } = useRecipe(recipeId);
    const navigate = useNavigate();

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-recipe">
                <p>{`Delete ${recipe ? recipe.strMeal : 'recipe'} from list?`}</p>
                <button onClick={() => deleteRecipe(getList, listId, recipeId, navigate, setErrorMessage, userId)} className="delete-recipe__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-recipe__button">Cancel</button>
            </div>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
        </Modal>
    )
}

export default DeleteRecipe;