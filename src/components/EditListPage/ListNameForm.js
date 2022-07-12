import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import CloseSVG from './../SVGs/CloseSVG';

const ListNameForm = ({ editingName, turnOffEditMode, list, listId, updateList }) => {
    const [listName, setListName] = useState('');
    const nameInput = useRef(null);
    const nameForm = useRef(null);

    // Add focus to name when edit mode is on
    useEffect(() => {
        if(editingName) {
            nameInput.current.focus();
        }
    }, [editingName]);

    // Close edit name form if you click outside of it
    useEffect(() => {
        const closeForm = e => {
            if (nameInput.current.contains(e.target)) {
                return
            }
            turnOffEditMode();
        }

        document.body.addEventListener('click', closeForm);

        return () => document.body.removeEventListener('click', closeForm);
    }, [editingName, turnOffEditMode]);

    // In edit mode, save changes as user types
    useEffect(() => {
        const saveName = async newName => {
            const { data } = await axios.put(`/lists/${listId}`, { name: newName });
            console.log(data.list.recipes);
            updateList(data.list);
        }

        let timeoutId = setTimeout(() => {
            if(listName) {
                saveName(listName);
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [listName, listId, updateList]);

    useEffect(() => {
        // Set input value to list name when form first renders
        setListName(list.name);

        // Clear list name when component unmounts
        return () => setListName('');
    }, []);

    // Close out editing mode when user hits enter
    const handleKeyUp = e => e.key === 'Enter' && turnOffEditMode();

    return (
        <form ref={nameForm} className="list-name__form" onKeyUp={handleKeyUp} onSubmit={e => e.preventDefault()}>
            <input ref={nameInput} className="list-name__input" onChange={e => setListName(e.target.value)} value={listName} />
            <CloseSVG className="list-name__svg" handleClick={turnOffEditMode} />
        </form>
    )
}

export default ListNameForm;