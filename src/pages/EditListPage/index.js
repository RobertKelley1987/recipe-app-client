import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipes from './Recipes';
import Search from './Search';
import ListName from './ListName';
import './DeleteRecipe.scss';
import './EditListPage.scss';


const EditListPage = props => {
    // Track whether search section is visible on screen
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { listId } = useParams();
    const { list, updateList } = props

    // Scroll to top on initial render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Get list data when page first renders
    useEffect(() => {
        const getList = async listId => {
            const { data } = await axios.get(`/lists/${listId}`);
            updateList(data.list);
        }

        getList(listId);

        // Clear list data when component unmounts
        return () => updateList(null);
    }, [listId, updateList]);

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