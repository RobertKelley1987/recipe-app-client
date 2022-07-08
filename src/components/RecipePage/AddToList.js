import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
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

const List = ({ list, recipeId, recipeName, setModalIsVisible, setErrorMessage, setSuccessMessage }) => {
    const handleClick = async () => {
        const { data } = await axios.post(`/lists/${list._id}/recipes`, { recipe: { apiId: recipeId, name: recipeName } });
        if(data.err) {
            setErrorMessage('Recipe is already included in this list');
        } else {
            setSuccessMessage(`Recipe added!`);
            setModalIsVisible(false);
        }
    }

    return <li className="add-to-list__list" onClick={handleClick}>{list.name}</li>
}

const AddToList = ({ recipeId, recipeName, setModalIsVisible, setSuccessMessage, userId }) => {
    const [lists, setLists] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [newListInputVisible, setNewListInputVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const newListInput = useRef();

    // Get all list data when component first loads and save to component's state
    useEffect(() => {
        const getLists = async () => {
            const { data } = await axios.get(`/users/${userId}/lists`);
            setLists(data.lists);
        }

        getLists();
    }, [userId]);

    // When new list input becomes visible, add focus to it
    useEffect(() => {
        if(newListInputVisible) {
            newListInput.current.focus();
        }
    }, [newListInputVisible])

    const handleSubmit = async e => {
        console.log("USER ID: " + userId);
        e.preventDefault();
        const { data } = await axios.post(`/users/${userId}/lists`, { name: newListName });
        if(data.lists) {
            setLists(data.lists);
        } else {
            setErrorMessage('Failed to create new list')
        }
        setNewListInputVisible(false);
    }

    return lists && (
        <div className="add-to-list">
            <h2 className="add-to-list__heading">Add To List</h2>
            {renderErrorMessage(errorMessage, setErrorMessage)}
            <ul>
                {lists.map(list => {
                    return <List 
                                list={list} 
                                recipeId={recipeId}
                                recipeName={recipeName}
                                setErrorMessage={setErrorMessage} 
                                setModalIsVisible={setModalIsVisible} 
                                setSuccessMessage={setSuccessMessage} 
                            />
                })}
            </ul>
            {!newListInputVisible 
                ? <button onClick={() => setNewListInputVisible(true)}>New List</button>
                : <form onSubmit={handleSubmit}>
                    <input ref={newListInput} onChange={e => setNewListName(e.target.value)} value={newListName} />
                </form>
            }
        </div>
    );
}

export default AddToList;