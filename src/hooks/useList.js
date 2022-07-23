import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../services/List';

const useList = (userId) => {
    const [list, setList] = useState(null);
    const { listId } = useParams; 

    useEffect(() => {
        if(listId) {
            getList(listId, userId);
        }

        // Clear list data when component unmounts
        return () => setList(null);
    }, [listId, userId]);

    async function getList (listId, userId) {
        const data = await List.getOne(listId, userId);
        setList(data.list);
    }

    return [list, getList, setList];
};

export default useList;