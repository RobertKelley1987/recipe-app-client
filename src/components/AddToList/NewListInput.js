import { useEffect, useRef, useState } from 'react';
import List from '../../services/List';
import './NewListInput.scss';

const NewListInput = ({ addToListWrapper, newListInputVisible, setErrorMessage, setNewListInputVisible, setLists, userId }) => {
    const [newListName, setNewListName] = useState('');
    const newListInput = useRef(null);

    useEffect(() => {
        // To prevent app from crashing -- if refs to newListInput and addToListWrapper
        // cannot be found, stop function
        if(!newListInput || !newListInput.current || !addToListWrapper || !addToListWrapper.current) {
            return
        }
        // When new list input becomes visible, add focus to it.
        // Also scroll to top of add to list wrapper
        if(newListInputVisible) {
            newListInput.current.focus();
            addToListWrapper.current.scrollTo(0, 0);
        }

        // Clear list name input when component dismounts
        return () => setNewListName('');
    }, [newListInputVisible]);


    const handleSubmit = async e => {
        // Prevent page refresh on form submit
        e.preventDefault();
        // Post new list to app server 
        const data = await List.create(newListName, userId);
        // Test for server error
        if(data.err) {
            // Display error message
            setErrorMessage('Failed to create new list');
        } else {
            // Otherwise save new list of lists to app state
            setLists(data.lists);
        }
        // Hide new list name input
        setNewListInputVisible(false);
    }

    return newListInputVisible && (
        <form onSubmit={handleSubmit}>
            <input 
                className="new-list-input" 
                onChange={e => setNewListName(e.target.value)} 
                placeholder='New list name' 
                ref={newListInput} 
                value={newListName} 
            />
        </form>
    );
}

export default NewListInput;