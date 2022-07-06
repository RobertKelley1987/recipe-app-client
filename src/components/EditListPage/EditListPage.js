import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteRecipe from './DeleteRecipe';
import ListName from './ListName';
import RecipeSquare from '../RecipeSquare';
import SearchSection from './../SearchSection/SearchSection';
import './DeleteRecipe.scss';
import './EditListPage.scss';

const EditListPage = ({ list, setList, setLists, userId }) => {
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { listId } = useParams();

    // get list data when page first loads
    useEffect(() => {
        const getList = async () => {
            const { data } = await axios.get(`/lists/${listId}`);
            setList(data.list);
        }

        getList();
    }, [listId]);

    useEffect(() => {
         // If user has no recipes in this list, make search section visible
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list]);

    const updateList = useCallback(newList => setList(newList), []);

    const renderListGrid = list => {
        if(list.recipes.length > 0){
            return (
                <div className="edit-list-page__list-grid">
                    {list.recipes.map(recipeId => {
                        return <RecipeSquare 
                                    key={recipeId} 
                                    recipeId={recipeId} 
                                    editPage={true} 
                                    listId={listId} 
                                />
                    })}
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
                ? <SearchSection list={list} listId={listId} setList={setList} setSearchIsVisible={setSearchIsVisible} /> 
                : <span onClick={() => setSearchIsVisible(true)} className="edit-list-page__find-recipes">Find Recipes</span>
            }
        </main>
    )
}

export default EditListPage;