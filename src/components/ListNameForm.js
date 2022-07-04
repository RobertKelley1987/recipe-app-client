import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import CloseSVG from './SVGs/CloseSVG';

const ListNameForm = ({ editingName, setEditingName, list, listId, setList }) => {
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
            console.log('event is happening');
            if (nameInput.current.contains(e.target)) {
                return
            } {
                setEditingName(false);
            }
        }

        document.body.addEventListener('click', closeForm);

        return () => document.body.removeEventListener('click', closeForm);
    }, [editingName]);

    // In edit mode, save changes as user types
    useEffect(() => {
        const saveName = async newName => {
            const { data } = await axios.put(`/lists/${listId}`, { name: newName });
            setList(data.list);
        }

        let timeoutId = setTimeout(() => {
            if(listName) {
                saveName(listName);
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [listName]);

    // when form firsts loads, set input value to list name
    useEffect(() => {
        setListName(list.name);
    }, [])

    // Close out editing mode when user hits enter
    const handleKeyUp = e => {
        if(e.key === 'Enter') {
            setEditingName(false);
        }
    }

    return (
        <form ref={nameForm} className="list-name__form" onKeyUp={handleKeyUp} onSubmit={e => e.preventDefault()}>
            <input ref={nameInput} className="list-name__input" onChange={e => setListName(e.target.value)} value={listName} />
            <CloseSVG className="list-name__svg" handleClick={() => setEditingName(false)}/>
        </form>
    )
}

export default ListNameForm;