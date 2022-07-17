import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import List from '../services/List';
import Modal from './Modal';
import './DeleteList.scss';


const deleteList = async (listId, userId, navigate, setLists) => {
    const data = await List.deleteOne(listId, userId);
    setLists(data.lists);
    navigate(-1);
}

const DeleteList = ({ setLists, userId }) => {
    const [list, setList] = useState(null);
    const { listId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getList = async listId => {
            const data = await List.getOne(listId);
            setList(data.list);
        }

        getList(listId);
    }, [listId]);

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-list">
                <p>{`Delete ${list ? list.name : 'list'}?`}</p>
                <button onClick={() => deleteList(listId, userId, navigate, setLists)} className="delete-list__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-list__button">Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteList;