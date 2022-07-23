import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { hasResults} from '../../util/has-results';
import ErrorMessage from '../ErrorMessage';
import LoadingWrapper from '../LoadingWrapper';
import Recipe from '../../services/Recipe';
import RecipeList from './RecipeList';
import Modal from '../Modal';
import NewListInput from './NewListInput';
import './AddToList.scss';
import List from '../../services/List';

const AddToList = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [lists, setLists] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [newListInputVisible, setNewListInputVisible] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const addToListWrapper = useRef(null);

    const { recipeId } = useParams();
    const navigate = useNavigate();

    const { updateLists, userId } = props;

    // Fetch recipe data from api and update lists
    useEffect(() => {
        const getRecipe = async recipeId => {
            const data = await Recipe.getOne(recipeId);
            if(data.err) {
                setErrorMessage('Failed to fetch recipe data from server. Please try again later.')
            }
            setRecipe(data.meals[0]);
        }

        const getLists = async userId => {
            const data = await List.getAll(userId);
            setLists(data.lists);
        }

        const getRecipeAndLists = async recipeId => {
            await getRecipe(recipeId, userId);
            await getLists(userId);
            setIsLoading(false);
        }

        getRecipeAndLists(recipeId)
    }, [recipeId, userId]);

    // When component unmounts, update app state with changes to user's lists
    useEffect(() => {
        // Function to get updated lists from app server and update app state
        const getLists = async userId => {
            const data = await List.getAll(userId);
            updateLists(data.lists);
        }

        // Only run function when component unmounts
        return () => getLists(userId);
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
            <div ref={addToListWrapper} className="add-to-list">
                <h2 className="add-to-list__heading">Add To List</h2>

                <NewListInput 
                    addToListWrapper={addToListWrapper}
                    newListInputVisible={newListInputVisible} 
                    setErrorMessage={setErrorMessage} 
                    setNewListInputVisible={setNewListInputVisible}
                    setLists={setLists}
                    userId={userId} 
                />

                <LoadingWrapper isLoading={isLoading} textOnly={true} >
                    <ul className="add-to-list__lists">
                        {hasResults(lists) && lists.map(list => <RecipeList {...props} key={list._id} list={list} recipe={recipe} setErrorMessage={setErrorMessage} />)}
                    </ul>
                    {!newListInputVisible && <button className="add-to-list__button" onClick={() => setNewListInputVisible(true)}>New List</button>}
                </LoadingWrapper>

                {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
            </div>
        </Modal>
    );
}

export default AddToList;