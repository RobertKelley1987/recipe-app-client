import { useCallback, useState } from 'react';
import ListNameForm from './ListNameForm';
import './ListName.scss';

const ListName = props => {
    const { list } = props;
    const [editingName, setEditingName] = useState(false);

    const turnOnEditMode = e => { 
        // prevents click event to close form by clicking outside it from firing
        e.stopPropagation(); 
        // open edit mode for list name
        setEditingName(true); 
    }

    const turnOffEditMode = useCallback(() => setEditingName(false), []);

    if (!editingName) {
        return <h1 onClick={turnOnEditMode} className="list-name__name">{list.name ? list.name : 'Untitled List'}</h1>
    } else {
        return <ListNameForm editingName={editingName} turnOffEditMode={turnOffEditMode} {...props} />
    }
}

export default ListName;