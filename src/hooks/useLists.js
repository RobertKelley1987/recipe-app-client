import { useEffect, useState } from 'react';
import List from '../services/List';

const useLists = userId => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        // Fetch all user lists from app server
        const getLists = async userId => {
            const data = await List.getAll(userId);
            setLists(data.lists);
        }

        // If user is logged in, get lists from app server and save
        if(userId) {
            getLists(userId);
        }
    }, [userId]);

    return [lists, setLists];
}

export default useLists;