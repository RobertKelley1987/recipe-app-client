import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './DeleteRecipe.scss';

const deleteList = async (listId, userId, navigate, setList) => {
    const { data } = await axios.delete(`/users/${userId}/lists/${listId}`);
    setList(data.lists);
    navigate(`/lists`);
}

const DeleteList = ({ setLists, userId }) => {
    const { listId } = useParams();
    const navigate = useNavigate();

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-recipe">
                <p>Delete list?</p>
                <button onClick={() => deleteList(listId, userId, navigate, setLists)} className="delete-recipe__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-recipe__button">Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteList;