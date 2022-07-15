import { useNavigate } from 'react-router-dom';
import List from '../services/List';
import './NewListLink.scss';

const NewListLink = ({ setErrorMessage, userId }) => {
    const navigate = useNavigate();

    const createNewList = async (setErrorMessage, userId) => {
        // Post new list to database with no name
        const data = await List.create('', userId);
        // Test for server error
        if(data.err) {
            // Display error message
            setErrorMessage('Failed to create new list.');
        } else {
            // Navigate to edit page for new list
            navigate(`/lists/${data.listId}`) 
        }
    }

    return <button className="new-list-link" onClick={() => createNewList(setErrorMessage, userId)}>New List</button>;
}

export default NewListLink;