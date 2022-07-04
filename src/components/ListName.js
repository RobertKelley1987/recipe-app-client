import { useState } from 'react';
import ListNameForm from './ListNameForm';
import './ListName.scss';

const ListName = props => {
    const { list } = props;
    const [editingName, setEditingName] = useState(false);

    const handleClick = e => { 
        // prevents click event to close form by clicking outside it from firing
        e.stopPropagation(); 
        // open edit mode for list name
        setEditingName(true); 
    }

    if (!editingName) {
        return <h1 onClick={handleClick} className="list-name__name">{list.name ? list.name : 'Untitled List'}</h1>
    } else {
        return <ListNameForm editingName={editingName} setEditingName={setEditingName} {...props} />
    }
}

export default ListName;