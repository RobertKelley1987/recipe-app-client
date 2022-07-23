import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useList from '../hooks/useList';
import List from '../services/List';
import Modal from './Modal';
import './DeleteList.scss';
import ErrorMessage from './ErrorMessage';


const deleteList = async (listId, userId, navigate, setLists, setErrorMessage) => {
    const data = await List.deleteOne(listId, userId);
    if(data.err) {
        setErrorMessage('Unable to delete list. Please try again.')
    } else {
        setLists(data.lists);
        navigate(-1);
    }
}

const DeleteList = ({ setLists, userId }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const { listId } = useParams();
    const [list] = useList(listId, userId)
    const navigate = useNavigate();

    return (
        <Modal onDismiss={() => navigate(-1)}>
            <div className="delete-list">
                <p>{`Delete ${list ? list.name : 'list'}?`}</p>
                <button onClick={() => deleteList(listId, userId, navigate, setLists, setErrorMessage)} className="delete-list__button">Delete</button>
                <button onClick={() => navigate(-1)} className="delete-list__button">Cancel</button>
            </div>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
        </Modal>
    )
}

export default DeleteList;