import { useEffect } from 'react';
import useEditName from '../../hooks/useEditName';
import useNameInput from '../../hooks/useNameInput';
import CloseSVG from '../../components/SVGs/CloseSVG';
import './ListNameForm.scss';

const ListNameForm = ({ editingName, list, listId, setList, turnOffEditMode, updateErrorMessage, userId }) => {
    const { nameInput } = useNameInput(editingName, turnOffEditMode);
    const [listName, setListName] = useEditName(listId, setList, updateErrorMessage, userId);

    useEffect(() => {
        // Set input value to list name when form first renders
        setListName(list.name);

        // Clear list name when component unmounts
        return () => setListName('');
    }, []);

    // Close out editing mode when user hits enter
    const handleKeyUp = e => e.key === 'Enter' && turnOffEditMode();

    return (
        <form className="list-name-form" onKeyUp={handleKeyUp} onSubmit={e => e.preventDefault()}>
            <input ref={nameInput} className="list-name-form__input" onChange={e => setListName(e.target.value)} value={listName} />
            <CloseSVG className="list-name-form__svg" handleClick={turnOffEditMode} />
        </form>
    )
}

export default ListNameForm;