import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './NewListInput.scss';

const NewListInput = ({ newListInputVisible, setErrorMessage, setNewListInputVisible, updateLists, userId }) => {
    const [newListName, setNewListName] = useState('');
    const newListInput = useRef(null);

    useEffect(() => {
        // When new list input becomes visible, add focus to it
        if(newListInputVisible) {
            newListInput.current.focus();
        }

        // Clear list name input when component dismounts
        return () => {
            setNewListName('');
        }
    }, [newListInputVisible]);


    const handleSubmit = async e => {
        // Prevent page refresh on form submit
        e.preventDefault();
        // Post new list to app server 
        const { data } = await axios.post(`/users/${userId}/lists`, { name: newListName });
        // Test for server error
        if(data.err) {
            // Display error message
            setErrorMessage('Failed to create new list');
        } else {
            // Otherwise save new list of lists to app state
            updateLists(data.lists);
        }
        // Hide new list name input
        setNewListInputVisible(false);
    }

    return newListInputVisible && (
        <form onSubmit={handleSubmit}>
            <input className="new-list-input" ref={newListInput} onChange={e => setNewListName(e.target.value)} placeholder='New list name' value={newListName} />
        </form>
    );
}

export default NewListInput;