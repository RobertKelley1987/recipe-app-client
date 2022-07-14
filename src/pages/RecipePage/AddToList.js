import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import NewListInput from './NewListInput';
import './AddToList.scss';

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

const AddToList = ({ lists, modalIsVisible, recipeId, recipeName, setErrorMessage, setModalIsVisible, setSuccessMessage, updateLists, userId }) => {
    const [newListInputVisible, setNewListInputVisible] = useState(false);

    // Get all list data when component first loads and save to component's state
    useEffect(() => {
        const getLists = async () => {
            const { data } = await axios.get(`/users/${userId}/lists`);
            if(data.err) {
                setErrorMessage('Failed to fetch lists from server. Please try again later.')
            }
            updateLists(data.lists);
        }

        getLists();
    }, [userId, updateLists]);

    const closeModal = () => {
        // Set modal state to closed
        setModalIsVisible(false);
        // Also set new list input state to closed
        setNewListInputVisible(false);
        // Clear any error message displayed before closing
        setErrorMessage('');
    }

    if (modalIsVisible && lists) {
        return (
            <Modal onDismiss={closeModal}>
                <div className="add-to-list">
                    <h2 className="add-to-list__heading">Add To List</h2>
                    <NewListInput 
                        newListInputVisible={newListInputVisible} 
                        setErrorMessage={setErrorMessage} 
                        setNewListInputVisible={setNewListInputVisible}
                        updateLists={updateLists} 
                        userId={userId} 
                    />
                    <ul className="add-to-list__lists">
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
                    {!newListInputVisible && <button className="add-to-list__button" onClick={() => setNewListInputVisible(true)}>New List</button>}
                </div>
            </Modal>
        );
    }
}

export default AddToList;