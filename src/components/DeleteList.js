import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import List from '../services/List';
import Modal from './Modal';
import './DeleteList.scss';
import ErrorMessage from './ErrorMessage';


const deleteList = async (listId, userId, navigate, setErrorMessage) => {
    const data = await List.deleteOne(listId, userId);
    if(data.err) {
        setErrorMessage('Unable to delete list. Please try again.')
    } else {
        navigate(-1);
    }
}

const DeleteList = ({ setLists, userId }) => {
    const [errorMessage, setErrorMessage] = useState('');
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
            <div className="delete-list__wrapper">
                <p>{`Delete ${list ? list.name : 'list'}?`}</p>
                <button onClick={() => deleteList(listId, userId, navigate, setLists)} className="delete-list__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-list__button">Cancel</button>
            </div>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
        </Modal>
    )
}

export default DeleteList;