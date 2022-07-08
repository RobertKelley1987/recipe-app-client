import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListName from './ListName';
import RecipeSquares from '../RecipeSquares';
import SearchSection from './../SearchSection/SearchSection';
import './DeleteRecipe.scss';
import './EditListPage.scss';


const EditListPage = ({ list, updateList, setLists, userId }) => {
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
                    <RecipeSquares recipes={list.recipes} />
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

    return list && (
        <main className="edit-list-page">
            <header>
                <ListName list={list} listId={listId} updateList={updateList} setLists={setLists} userId={userId} />
            </header>
            {renderListGrid(list)}
            {searchIsVisible 
                ? <SearchSection list={list} listId={listId} updateList={updateList} setSearchIsVisible={setSearchIsVisible} /> 
                : <span onClick={() => setSearchIsVisible(true)} className="edit-list-page__find-recipes">Find Recipes</span>
            }
        </main>
    )
}

export default EditListPage;