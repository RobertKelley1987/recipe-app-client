import axios from 'axios';
import { useEffect, useState } from 'react';
import CloseSVG from '../SVGs/CloseSVG';
import './AddToList.scss';

const renderErrorMessage = (errorMessage, setErrorMessage) => {
    if(errorMessage) {
        return (
            <div className="add-to-list__error-message" onClick={() => setErrorMessage('')}>
                <CloseSVG className="add-to-list__error-svg" />
                <p className="add-to-list__error-text">{errorMessage}</p>
            </div>
        )
    }    
}

const List = ({ list, recipeId, setModalIsVisible, setErrorMessage, setSuccessMessage }) => {
    const handleClick = async () => {
        const { data } = await axios.post(`/lists/${list._id}/recipes`, { recipeId: recipeId });
        if(data.err) {
            setErrorMessage('Recipe is already included in this list');
        } else {
            setSuccessMessage(`Recipe added!`);
            setModalIsVisible(false);
        }
    }

    return <li className="add-to-list__list" onClick={handleClick}>{list.name}</li>
}

const AddToList = ({ recipeId, setModalIsVisible, setSuccessMessage, userId }) => {
    const [lists, setLists] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Get all list data when component first loads and save to component's state
    useEffect(() => {
        const getLists = async () => {
            const { data } = await axios.get(`/users/${userId}/lists`);
            setLists(data.lists);
        }

        getLists();
    }, [userId]);

    return lists && (
        <div className="add-to-list">
            <h2 className="add-to-list__heading">Add To List</h2>
            {renderErrorMessage(errorMessage, setErrorMessage)}
            <ul>
                {lists.map(list => {
                    return <List 
                                list={list} 
                                recipeId={recipeId}
                                setErrorMessage={setErrorMessage} 
                                setModalIsVisible={setModalIsVisible} 
                                setSuccessMessage={setSuccessMessage} 
                            />
                })}
            </ul>
        </div>
    );
}

export default AddToList;