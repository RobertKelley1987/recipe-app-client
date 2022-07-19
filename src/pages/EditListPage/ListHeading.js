import { useCallback, useState } from 'react';
import ListNameForm from './ListNameForm';
import Searchbar from '../../components/Searchbar';
import './ListHeading.scss';

const ListHeading = props => {
    const { list, filterIsVisible, setFilterIsVisible, setFilterTerm } = props;
    const [editingName, setEditingName] = useState(false);

    const turnOnEditMode = e => { 
        // prevents click event to close form by clicking outside it from firing
        e.stopPropagation(); 
        // open edit mode for list name
        setEditingName(true); 
    }

    const turnOffEditMode = useCallback(() => setEditingName(false), []);

    if (!editingName) {
        return (
            <header className={filterIsVisible ? "list-heading list-heading--column" : "list-heading"}>
                <h1 onClick={turnOnEditMode} className="list-heading__name">{list.name}</h1>
                <Searchbar {...props} searchIsVisible={filterIsVisible} setSearchIsVisible={setFilterIsVisible} placeholder="search within list" setSearchTerm={setFilterTerm}/>
            </header>
        )
    } else {
        return <ListNameForm {...props} editingName={editingName} turnOffEditMode={turnOffEditMode} />
    }
}

export default ListHeading;