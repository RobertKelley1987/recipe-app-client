import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListName from './ListName';
import Squares from '../Squares';
import SearchWrapper from '../SearchWrapper/SearchWrapper';
import './DeleteRecipe.scss';
import './EditListPage.scss';


const EditListPage = ({ list, updateList, setLists, userId }) => {
    // track whether search section is visible on screen
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { listId } = useParams();

    // scroll to top on initial load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // get list data when page first loads
    useEffect(() => {
        const getList = async listId => {
            const { data } = await axios.get(`/lists/${listId}`);
            updateList(data.list);
        }

        getList(listId);
    }, [listId, updateList]);

    useEffect(() => {
         // If user has no recipes in this list, make search section visible
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list]);

    const renderListGrid = list => {
        if(list.recipes.length > 0){
            return (
                <div className="edit-list-page__list-grid">
                    <Squares recipes={list.recipes} resultType='recipe' />
                </div>
            );
        } else {
            return (
                <div className="edit-list-page__empty-list">
                    Your list is empty! Use the search bar below to find recipes and add them to your list.
                </div>
            );
        }
    }

    const renderSearch = (list, searchIsVisible, setSearchIsVisible, updateList) => {
        if(searchIsVisible) { 
            return <SearchWrapper list={list} updateList={updateList} setSearchIsVisible={setSearchIsVisible} />;
        } else {
            return <span onClick={() => setSearchIsVisible(true)} className="edit-list-page__find-recipes">Find Recipes</span>;
        }
    }

    return list && (
        <main className="edit-list-page">
            <header>
                <ListName list={list} updateList={updateList} setLists={setLists} userId={userId} />
            </header>
            {renderListGrid(list)}
            {renderSearch(list, searchIsVisible, setSearchIsVisible, updateList)}
        </main>
    )
}

export default EditListPage;