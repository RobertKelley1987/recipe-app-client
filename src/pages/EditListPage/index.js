import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipes from './Recipes';
import Search from './Search';
import ListName from './ListName';
import './EditListPage.scss';
import List from '../../services/List';


const EditListPage = props => {
    // Track whether search section is visible on screen
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { listId } = useParams();
    const { list, updateList, userId } = props

    // Scroll to top on initial render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Get list data when page first renders
    useEffect(() => {
        const getList = async (listId, userId) => {
            const data = await List.getOne(listId, userId);
            updateList(data.list);
        }

        getList(listId, userId);

        // Clear list data when component unmounts
        return () => updateList(null);
    }, [listId, updateList, userId]);

    // Make search section visible if user's list is empty
    useEffect(() => {
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list]);

    return list && (
        <main className="edit-list-page">
            <header>
                <ListName {...props} listId={listId} />
            </header>
            <Recipes {...props} />
            <Search {...props} searchIsVisible={searchIsVisible} setSearchIsVisible={setSearchIsVisible} />
        </main>
    )
}

export default EditListPage;