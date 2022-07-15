import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import List from '../../services/List';
import LoadingWrapper from '../LoadingWrapper';
import Recipe from '../../services/Recipe';
import RecipeList from './RecipeList';
import Modal from '../Modal';
import NewListInput from './NewListInput';
import './AddToList.scss';

const AddToList = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [modalErrorMessage, setModalErrorMessage] = useState('');
    const [newListInputVisible, setNewListInputVisible] = useState(false);
    const [recipe, setRecipe] = useState(null);

    const { recipeId } = useParams();
    const navigate = useNavigate();

    const { lists, updateLists, userId } = props;

    // Get all list data when component first loads and save to component's state
    useEffect(() => {
        const getLists = async () => {
            const data = await List.getAll(userId);
            if(data.err) {
                setModalErrorMessage('Failed to fetch lists from server. Please try again later.')
            } else {
                updateLists(data.lists);
            }
            setIsLoading(false);
        }

        getLists();
    }, [userId, updateLists]);

    // Fetch recipe data from api
    useEffect(() => {
        const getRecipe = async recipeId => {
            const data = await Recipe.getOne(recipeId);
            if(data.err) {
                setModalErrorMessage('Failed to fetch recipe data from server. Please try again later.')
            }
            setRecipe(data.meals[0]);
        }

        getRecipe(recipeId);
    }, [recipeId]);

    const closeModal = () => {
        // Set new list input state to closed
        setNewListInputVisible(false);
        // Clear any error message displayed before closing
        setModalErrorMessage('');
        // Navigate back to page beneath modal
        navigate(-1);
    }

    
    return (
        <Modal onDismiss={closeModal}>
            <div className="add-to-list">
                <h2 className="add-to-list__heading">Add To List</h2>
                <NewListInput 
                    newListInputVisible={newListInputVisible} 
                    setErrorMessage={setModalErrorMessage} 
                    setNewListInputVisible={setNewListInputVisible}
                    updateLists={updateLists} 
                    userId={userId} 
                />
                <LoadingWrapper isLoading={isLoading}>
                    <ul className="add-to-list__lists">
                        {recipe && lists.map(list => <RecipeList {...props} list={list} recipe={recipe} setErrorMessage={setModalErrorMessage}/>)}
                    </ul>
                    {!newListInputVisible && <button className="add-to-list__button" onClick={() => setNewListInputVisible(true)}>New List</button>}
                </LoadingWrapper>
                {modalErrorMessage && <ErrorMessage errorMessage={modalErrorMessage} setErrorMessage={setModalErrorMessage} />}
            </div>
        </Modal>
    );
}

export default AddToList;