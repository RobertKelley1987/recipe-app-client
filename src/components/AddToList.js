import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';
import NewListInput from './NewListInput';
import './AddToList.scss';

const List = ({ list, navigate, recipe, setErrorMessage, setSuccessMessage }) => {
    // New recipe to be added to database
    const newRecipe = { recipe: { apiId: recipe.idMeal, name: recipe.strMeal } }

    const handleClick = async () => {
        const { data } = await axios.post(`/lists/${list._id}/recipes`, newRecipe);
        // Test for server error
        if(data.err) {
            setErrorMessage(data.err.message);
        } else {
            setSuccessMessage(`Recipe added!`);
            navigate(-1);
        }
    }

    return <li className="add-to-list__list" onClick={handleClick}>{list.name}</li>
}

const AddToList = ({ lists, setErrorMessage, setSuccessMessage, updateLists, userId }) => {
    const [newListInputVisible, setNewListInputVisible] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const { recipeId } = useParams();
    const navigate = useNavigate();

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

    // Fetch recipe data from api
    useEffect(() => {
        const getRecipe = async recipeId => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
            if(data.err) {
                setErrorMessage('Failed to fetch recipe data from server. Please try again later.')
            }
            setRecipe(data.meals[0]);
        }

        getRecipe(recipeId);
    }, []);

    const closeModal = () => {
        // Set new list input state to closed
        setNewListInputVisible(false);
        // Clear any error message displayed before closing
        setErrorMessage('');
        // Navigate back to page beneath modal
        navigate(-1);
    }

    
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
                    {recipe && lists.map(list => {
                        return <List 
                                    list={list}
                                    navigate={navigate} 
                                    recipe={recipe}
                                    setErrorMessage={setErrorMessage} 
                                    setSuccessMessage={setSuccessMessage} 
                                />
                    })}
                </ul>
                {!newListInputVisible && <button className="add-to-list__button" onClick={() => setNewListInputVisible(true)}>New List</button>}
            </div>
        </Modal>
    );
}

export default AddToList;