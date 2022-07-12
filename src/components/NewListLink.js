import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewListLink.scss';

const NewListLink = ({ setErrorMessage, userId }) => {
    const navigate = useNavigate();

    const createNewList = async (setErrorMessage, userId) => {
        // Post new list to database
        const { data } = await axios.post(`/users/${userId}/lists`);
        // Test for server error
        if(data.err) {
            // Display error message
            setErrorMessage('There was an error');
        } else {
            // Navigate to edit page for new list
            navigate(`/lists/${data.listId}`) 
        }
    }

    return <button className="new-list-link" onClick={() => createNewList(setErrorMessage, userId)}>New List</button>;
}

export default NewListLink;