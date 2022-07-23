import { useEffect, useState } from 'react';
import List from '../services/List';

const useEditName = (listId, setList, updateErrorMessage, userId) => {
    const [listName, setListName] = useState('');

        // In edit mode, save changes as user types
        useEffect(() => {
            const saveName = async (listId, newName, userId) => {
                const data = await List.editName(listId, newName, userId);
                if(data.err) {
                    updateErrorMessage(data.err);
                } else {
                    setList(data.list);
                }
            }
    
            let timeoutId = setTimeout(() => {
                listName && saveName(listId, listName, userId);
            }, 100);
    
            return () => clearTimeout(timeoutId);
        }, [listName, listId, updateErrorMessage, userId]);

        return [listName, setListName];
}

export default useEditName;
