import List from './../services/List';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './DeleteList.scss';

const deleteList = async (listId, userId, navigate, setLists) => {
    const data = await List.deleteOne(listId, userId);
    setLists(data.lists);
    navigate(-1);
}

const DeleteList = ({ setLists, userId }) => {
    const { listId } = useParams();
    const navigate = useNavigate();

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-list">
                <p>Delete list?</p>
                <button onClick={() => deleteList(listId, userId, navigate, setLists)} className="delete-list__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-list__button">Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteList;